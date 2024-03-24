import cv2
import numpy as np
import streamlit as st

# Set the temperature threshold (in Celsius)
TEMPERATURE_THRESHOLD = 150

# Function to process the thermal image
def process_thermal_image(thermal_image):
    # Find the pixels with temperatures above the threshold
    high_temp_pixels = np.where(thermal_image >= TEMPERATURE_THRESHOLD)

    # If there are high-temperature pixels
    if high_temp_pixels[0].size > 0:
        # Get the coordinates of the high-temperature region
        min_x = np.min(high_temp_pixels[1])
        max_x = np.max(high_temp_pixels[1])
        min_y = np.min(high_temp_pixels[0])
        max_y = np.max(high_temp_pixels[0])

        high_temp_region = thermal_image[min_y:max_y+1, min_x:max_x+1]
        avg_temp = np.mean(high_temp_region)
        # Create a colored image for visualization
        colored_image = cv2.applyColorMap(thermal_image, cv2.COLORMAP_JET)

        # Draw a bounding box around the high-temperature region
        box_thickness = 2
        cv2.rectangle(colored_image, (min_x, min_y), (max_x, max_y), (0, 0, 255), box_thickness)

        temp_text = f"Estimated Temperature: {avg_temp:.2f}°C"
        cv2.putText(colored_image, temp_text, (min_x, min_y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0,0,255), 1, cv2.LINE_AA)

        # Display the image with the bounding box
        st.image(colored_image, channels="BGR")

    else:
        st.write("No temperature spike detected above the threshold.")

# Create a Streamlit page
def main():
    st.title("Thermal Image Analysis")

    # User input options
    option = st.sidebar.selectbox("Select an option", ("Upload Thermal Image", "Real-time Analysis"))

    if option == "Upload Thermal Image":
        uploaded_file = st.file_uploader("Upload a thermal image", type=["jpg", "jpeg", "png"])

        if uploaded_file is not None:
            file_bytes = np.asarray(bytearray(uploaded_file.read()), dtype=np.uint8)
            thermal_image = cv2.imdecode(file_bytes, cv2.IMREAD_GRAYSCALE)
            process_thermal_image(thermal_image)

    elif option == "Real-time Analysis":
        st.write("Turn on the camera to perform real-time thermal image analysis.")
        st.write("Note: This feature requires a thermal camera connected to your device.")

        # Initialize the thermal camera
        thermal_camera = cv2.VideoCapture(0)  # Replace 0 with the appropriate camera index

        # Create a placeholder for the camera feed
        placeholder = st.empty()

        while True:
            # Capture a frame from the thermal camera
            ret, frame = thermal_camera.read()

            thermal_image = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

            _, max_val, _, max_val_coords = cv2.minMaxLoc(thermal_image)

            if max_val >= TEMPERATURE_THRESHOLD:
                x, y = max_val_coords

                box_size = 40
                cv2.rectangle(frame, (x - box_size, y - box_size), (x + box_size, y + box_size), (0, 0, 255), 2)

                alert_message = "Temperature spike detected! Max temperature: {:.2f} °C".format(max_val)

                # Draw the alert message on the frame
                cv2.putText(frame, alert_message, (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2, cv2.LINE_AA)

            # Display the frame in the placeholder
            stframe = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            placeholder.image(stframe, channels="RGB", use_column_width=True)

            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

        thermal_camera.release()

if __name__ == "__main__":
    main()