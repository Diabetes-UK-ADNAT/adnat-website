var ConfigIsDev = true;
var Config = {
	version: '2.1.75',
	urlServicesRoot: ConfigIsDev ? 'https://10.0.2.2\\:4443/api/v1' : 'https://api.myadnat.co.uk\\:443/v1',
	urlPersons: ConfigIsDev ? 'https://10.0.2.2:4443/api/v1/persons' : 'https://api.myadnat.co.uk/v1/persons',
	urlLogin: ConfigIsDev ? 'https://auth.10.0.2.2:4443/login' : 'https://auth.myadnat.co.uk/login',
	urlLogout: ConfigIsDev ? 'https://auth.10.0.2.2:4443/logout' : 'https://auth.myadnat.co.uk/logout',
	urlProfile: ConfigIsDev ? 'https://auth.10.0.2.2:4443/profile' : 'https://auth.myadnat.co.uk/profile',
	urlSubject: ConfigIsDev ? 'https://10.0.2.2:4443/api/v1/subject' : 'https://api.myadnat.co.uk/v1/subject'
};

