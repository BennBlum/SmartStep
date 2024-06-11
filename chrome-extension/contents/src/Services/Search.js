import axios from 'axios';

// export class SearchParameter {
//     constructor(keywords) {
//         this.keywords = keywords;
//     }
// }

export class Search {
    async search(searchTerm, jsonData) {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/search', {
                query: searchTerm,
                threshold: 0.50,
                data: jsonData
            });

            const result = response.data;
            return result.results;
        } catch (error) {
            console.error('Error performing search:', error);
            return null;
        }
    }
}
