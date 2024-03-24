# Thermal Image Analysis for Construction Site Machinery

This project is developed for the L&T Createch 2024 Hackathon, focusing on detecting temperature spikes in construction site machinery and sending alerts to administrators for timely maintenance.

## Overview

Construction sites often employ heavy machinery that can experience temperature fluctuations due to prolonged usage or malfunctions. This project aims to monitor the thermal conditions of these machines in real-time and provide early warnings to administrators when temperature spikes are detected. By promptly addressing these issues, potential breakdowns or safety hazards can be mitigated, ensuring smooth operations and worker safety on the site.

## Features

- **Thermal Image Analysis**: The application can analyze thermal images from a connected camera or uploaded image files to detect temperature spikes in machinery.
- **Real-time Monitoring**: The real-time analysis feature allows continuous monitoring of the machinery's thermal conditions, enabling immediate detection of temperature anomalies.
- **SMS Alerts**: When a temperature spike is detected, the application sends an SMS alert to the administrator's phone number, providing details about the detected temperature spike.
- **Visualization**: The application displays a colored thermal image highlighting the high-temperature regions with bounding boxes and temperature annotations for easy identification.

## Installation

1. Clone the repository:
2. Install the required dependencies:
3.  Set up the necessary environment variables:
4.  Replace `your_telesign_customer_id`, `your_telesign_api_key`, and `administrator_phone_number` with your actual Telesign authentication credentials and the phone number to receive SMS alerts.

## Usage

Run the Streamlit application:
