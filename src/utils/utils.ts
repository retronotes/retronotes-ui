import { RetroData } from "@/types/type";
export function extractUserRetroIds(url: string): { retro_id: string, user_id: string } {

    const user_id_start = url.indexOf("user_") + 5; 
    const user_id_end = url.indexOf("-", user_id_start); 
    const user_id = url.substring(user_id_start, user_id_end);

    const retro_id_start = url.lastIndexOf("-") + 1; 
    const retro_id = url.substring(retro_id_start);

    return { user_id, retro_id };
}


export function getOnlyRetroData(data: RetroData): Omit<RetroData, 'id' | 'user_id' | 'retro_name'> {
    const { id, user_id, retro_name, ...rest } = data;
    return rest;
}

export function jsonToCsv(data: RetroData, headers: string[]): string {
    // Create arrays for each column
    const achievementRows = data.what_went_well.map(item => [item]);
    const improvementRows = data.what_went_wrong.map(item => [item]);
    const actionRows = data.action_item.map(item => [item]);

    // Calculate maximum number of rows among the three columns
    const maxRows = Math.max(achievementRows.length, improvementRows.length, actionRows.length);

    // Build CSV content row by row
    let csvContent = headers.join(',') + '\n';

    for (let i = 0; i < maxRows; i++) {
        const achievement = achievementRows[i] ? `"${achievementRows[i].join(', ')}"` : '';
        const improvement = improvementRows[i] ? `"${improvementRows[i].join(', ')}"` : '';
        const action = actionRows[i] ? `"${actionRows[i].join(', ')}"` : '';

        csvContent += `${achievement},${improvement},${action}\n`;
    }

    return csvContent;
}



export const customHeaders = ['Start Doing', 'Stop Doing/Issues/Should Change', 'Keep Doing/Outcomes And Successs'];

export const downloadCSVFile = (csvContent:string,fileName:string)=>{
        // Create a Blob from the CSV data
        const blob = new Blob([csvContent], { type: 'text/csv' });
        
        // Create a URL to the Blob
        const url = window.URL.createObjectURL(blob);

        // Create a link element, set its href and download attribute, and click it programmatically
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        const fileNameWithoutSpace = fileName.replace(/\s+/g, '-');
        a.download = `${fileNameWithoutSpace}.csv`;
        document.body.appendChild(a);
        a.click();

        // Cleanup
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
}

