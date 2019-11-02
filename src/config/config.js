class Config {
    static get region() {
        return "us-east-1";
    }

    /** port */
    static get dbPort() {
        return 3306;
    }

    /** user */
    static get dbUsername() {
        return "backendUser"; // "backendUser"; // admin
    }

    /** database */
    static get dbName() {
        return "control3db";
    }

    /** host */
    static get dbEndpoint() {
        return "tendenciasdb.cirt9lkaraum.us-east-1.rds.amazonaws.com";
    }

    /** Only available with admin user */
    static get password() {
        return "B-e-a8969";
    }
}

module.exports = Config;
