// Class that will contain all app related setting.
// API config and other settings will be configured here
export class AppSettings{

    // URL for BASE API
    public static get apiURL() : string {
        return "http://localhost/fundingApp/fundingApi/public/api/";
    }

    // How frequent API call should initiate to check whether Data has been changed or not
    public static get apiInterval(): number{
        return 5000; // milisecond
    }
} 