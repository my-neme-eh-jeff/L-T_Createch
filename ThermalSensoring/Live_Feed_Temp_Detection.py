import cv2
import numpy as np

# Set the temperature threshold (in Celsius)
TEMPERATURE_THRESHOLD = 150

# Initialize the thermal camera
thermal_camera = cv2.VideoCapture(0)  # Replace 0 with the appropriate camera index

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

    
    cv2.imshow("Thermal Camera", frame)

    
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

thermal_camera.release()
cv2.destroyAllWindows()