// Configuration settings for the Chantier Planning Tool
const config = {
    // Assignees that can be selected for chantiers
    assignees: [
        { id: "wang", name: "Wang", image: null },
        { id: "he", name: "He", image: null },
        { id: "hu", name: "Hu", image: null },
        { id: "guo", name: "Guo", image: null }
    ],
    
    // Urgency levels for chantiers
    urgencyLevels: [
        { value: "1", label: "Low" },
        { value: "2", label: "Normal" },
        { value: "3", label: "High" },
        { value: "4", label: "Urgent" }
    ],
    
    // Status options for chantiers
    statusOptions: [
        { value: "ongoing", label: "En cours" },
        { value: "completed", label: "Facture envoyé" }
    ],
    
    // Working hours
    workingHours: {
        start: "08:00",
        end: "17:00",
        workDays: [1, 2, 3, 4, 5] // Monday to Friday (0 is Sunday)
    }
};

export default config;