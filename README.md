# [AutoJournal](https://autojournal-zero.vercel.app/)

AutoJournal is a web application designed to help vehicle owners track their vehicle's maintenance, upgrades, and repairs. It provides a simple and intuitive interface for logging journal entries related to each vehicle, and offers visualizations to help users understand their spending patterns over time.

## Features

- Vehicle Management: Users can add multiple vehicles to their account and manage them individually. Each vehicle has its own set of journal entries.
- Journal Entries: For each vehicle, users can add journal entries that record maintenance, upgrades, and repairs. Each entry includes the service performed, the amount spent, the mileage at the time of service, and any additional notes.
- Import Journal Entries: Users can import multiple journal entries at once from a CSV file. This feature supports bulk data entry, making it easy to migrate data from other systems or to recover data from a backup.
- Visualizations: AutoJournal provides several types of charts to help users visualize their spending patterns. Users can switch between a bar chart, pie chart, and area chart to view their data in different ways.
- Timeline View: Journal entries are displayed on a timeline, making it easy to see the history of services performed on a vehicle. Users can click on a timeline item to view more details about the entry.
- Error Handling and Validation: The application includes robust error handling and validation. For example, when importing journal entries from a CSV file, the application checks for missing required fields and incorrect data types, and logs any errors.

## Use Case

AutoJournal is perfect for vehicle owners who want to keep a detailed record of their vehicle's maintenance history. By tracking services and costs over time, users can better understand their vehicle's needs and plan for future expenses. The ability to import data from a CSV file makes it easy to get started or to switch from another system.

Whether you're a car enthusiast with a fleet of vehicles or a daily driver looking to stay on top of maintenance, AutoJournal provides the tools you need to keep your vehicles in top shape.

## About the Project

AutoJournal is built using a variety of modern web development technologies to provide a robust and user-friendly experience.

- [Next.js](https://nextjs.org/): This powerful React framework enables server-side rendering and generating static websites for React-based web applications. It provides the foundation for AutoJournal's user interface.

- [MongoDB](https://docs.mongodb.com/): This source-available, cross-platform, document-oriented database program allows us to store our data in flexible, JSON-like documents. This means that fields can vary from document to document and the data structure can be changed over time, providing the flexibility needed for a project like AutoJournal.

- [NextAuth](https://next-auth.js.org/): This complete open-source authentication solution is designed from the ground up to support Next.js and Serverless. It handles user authentication in AutoJournal, ensuring that user data is secure and access is controlled.

- [Material-UI](https://mui.com/): This popular React UI framework implements Google's Material Design, providing a sleek and modern look for AutoJournal's user interface. It also offers a wide range of components and customization options, making it easier to build a responsive and accessible application.

- [Papa Parse](https://www.papaparse.com/): This powerful, in-browser CSV parser is used to handle the import of journal entries from CSV files. It enables robust error checking and provides a smooth user experience when importing data. - [Sample.csv](https://github.com/maksymsagadin/autojournal/files/11987261/Sample.csv)

By leveraging these technologies, AutoJournal provides a comprehensive solution for tracking vehicle maintenance, upgrades, and repairs.

## Visit the Application

You can visit and use the application at [https://autojournal-zero.vercel.app/](https://autojournal-zero.vercel.app/). 

## Feedback and Contributions

Your feedback and contributions are welcome!
