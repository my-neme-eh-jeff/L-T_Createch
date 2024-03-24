import folium
import streamlit as st
import openrouteservice as ors
import math
from data.data2 import construction_data

from streamlit_folium import st_folium

option = st.sidebar.selectbox(
    ':red[Please Select a Project]',
    ('Road Construction', 'Metro Bridge', 'Residential Complex','Office Building Renovation','Airport Terminal Expansion'))
st.write(f':red[**Selected Project**] : :green[{option}]')
st.sidebar.write("--------------------------------")
st.write("--------------------------------")
materials_list = list(construction_data[option]["Materials"].keys())
# st.write('**Matrials Required** with **Location** : ', materials_list)

location_dict = {}
for material in materials_list:
    locations = tuple([i['Location'] for i in construction_data[option]["Materials"][material]])
    location_dict[material] = st.sidebar.selectbox(
        f':red[Please Select a location for] :green[**{material}**]',locations)
# for material in location_dict:
#     st.write(f'Selected location for **{material}** : ***{location_dict[material]}***')
st.write(':green[**Matrials Required**] :red[with] :green[**Location**] : ', location_dict)
st.write("--------------------------------")
coords = []
names = []
for material in location_dict:
    for location in construction_data[option]["Materials"][material]:
        if location['Location'] ==  location_dict[material]:
            lat = location['Latitude']
            lon = location['Longitude']
            coords.append([lon, lat])
            names.append(location_dict[material])
st.sidebar.write("--------------------------------")

client = ors.Client(key='your key')
# coords = [
#     [-87.7898356, 41.8879452],
#     [-87.7808524, 41.8906422],
#     [-87.7895149, 41.8933762],
#     [-87.7552925, 41.8809087],
#     [-87.7728134, 41.8804058],
#     [-87.7702890, 41.8802231],
#     [-87.7787924, 41.8944518],
#     [-87.7732345, 41.8770663],
# ]

# names = [
#     "A",
#     "B",
#     "C",
#     "D",
#     "E",
#     "F",
#     "G",
#     "H"
# ]

vehicle_start = [-87.7026, 41.8232]
vehicle_end = [-87.787984, 41.8871616]
m = folium.Map(location=list(reversed([-87.787984, 41.8871616])), tiles="cartodbpositron", zoom_start=14)
for coord, name in zip(coords, names):
    folium.Marker(location=list(reversed(coord)), popup=folium.Popup(name, show=True)).add_to(m)

folium.Marker(location=list(reversed(vehicle_start)), icon=folium.Icon(color="red"), popup = folium.Popup("Ending Location", show=True)).add_to(m)
folium.Marker(location=list(reversed(vehicle_end)), icon=folium.Icon(color="green"), popup = folium.Popup("Starting Location", show=True)).add_to(m)

vehicles = [
    ors.optimization.Vehicle(id=0, profile='driving-car', start=vehicle_start, end=vehicle_end, capacity=[2]),
    ors.optimization.Vehicle(id=1, profile='driving-car', start=vehicle_start, end=vehicle_end, capacity=[3]),
]
jobs = [ors.optimization.Job(id=index, location=coords, amount=[1]) for index, coords in enumerate(coords)]
optimized = client.optimization(jobs=jobs, vehicles=vehicles, geometry=True)
line_colors = ['green', 'orange', 'blue', 'yellow']
for route in optimized['routes']:
    folium.PolyLine(locations=[list(reversed(coords)) for coords in ors.convert.decode_polyline(route['geometry'])['coordinates']], color=line_colors[route['vehicle']]).add_to(m)

st_data = st_folium(m, width=725)