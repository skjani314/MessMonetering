# **Mess Monitoring**

## **Project Overview**

SkillLink is a complaint management system designed to streamline the process of lodging and resolving issues related to mess operations. The system has three types of users, each with specific features:

### **1. Student**
- **Features**:
  - Raise complaints on various issues with the ability to:
    - Provide descriptions.
    - Attach images.
  - Complaints are forwarded to representatives/coordinators.
  - View all complaints in a dashboard.
  - Click on a complaint in the table to view detailed information in a pop-up, including:
    - Images, description, issue, and category.
    - Timeline of the complaint.

---

### **2. Representative**
- **Features**:
  - Review complaints raised by students in a table format.
  - Click on a complaint to view a pop-up with details, including:
    - Images, description, issue category.
    - Timeline.
    - User details of the complaint raiser.
  - Change the status of complaints via a status button in the table.
  - Raise complaints as a student (these complaints are forwarded to the admin).
  - Access a dashboard with:
    - **Bar Graph**: Displays the number of complaints for each month.
    - **Pie Chart**: Displays category-wise complaints for the current month.
  - Dashboards assist in analyzing mess performance trends and identifying major problem categories.

---

### **3. Admin**
- **Features**:
  - Review and change the status of both student and representative complaints.
  - Access the same dashboard as the representative.
  - Handle student complaints that are escalated after 2 days of inaction by representatives.

---

### **Common Features**
- **Password Reset**:
  - All users can reset their password using a reset link sent to their email.

---

## **Tech Stack**
- **Frontend**:
  - Vite.js (converted to a Progressive Web App).
  - Bootstrap (for responsive design).
- **Backend**:
  - Node.js / Express.js.
- **Database**:
  - MongoDB.
- **Progressive Web App**:
  - Android Studio was used to convert the website into a PWA.

---

## **Environment Variables**
All environment variables are defined in `.env` files for both the backend and frontend.

---

## **Deployment Links**
- **Frontend**: [SkillLink Frontend](https://mess-monetering.vercel.app/)
- **Backend**: [SkillLink Backend](https://messmonetering-production.up.railway.app/)
