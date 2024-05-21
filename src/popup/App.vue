<template>
    <div id="popup">
        <!-- <img src="@/assets/logo.png" alt="Extension Logo" /> -->
        <h1>Google Maps Data Extractor</h1>
        <table>
            <thead>
                <tr>
                    <th>Business Name</th>
                    <th>Address</th>
                    <!-- Additional headers as needed -->
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in extractedData" :key="item.id">
                    <td>{{ item.name || 'N/A' }}</td>
                    <td>{{ item.address || 'N/A' }}</td>
                    <!-- More data fields -->
                </tr>
            </tbody>
        </table>
        <button @click="downloadAsJson">Download as JSON</button>
        <button @click="downloadAsCsv">Download as CSV</button>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const extractedData = ref([]);


onMounted(async () => {
    chrome.runtime.sendMessage({ action: 'requestBusinessData' }, (response) => {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
        } else {
            // extractedData.value = response;
        }
    });
});

const downloadAsJson = () => {
    const jsonBlob = new Blob([JSON.stringify(extractedData)], { type: 'application/json' });
    const url = URL.createObjectURL(jsonBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'extracted_data.json';
    a.click();
    URL.revokeObjectURL(url);
};

const downloadAsCsv = () => {
    const csvContent = convertToCSV(extractedData);
    const csvBlob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(csvBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'extracted_data.csv';
    link.click();
    URL.revokeObjectURL(url);
};

const convertToCSV = (arr) => {
    return arr.map(item => Object.values(item).join(',')).join('\n');
};
</script>

<style lang="scss" scoped></style>