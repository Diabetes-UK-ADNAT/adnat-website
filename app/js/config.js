var ConfigIsDev = false;
var UseLocalVmTestConfig = false;
var Config = {
	version: '2.1.77',
	urlServicesRoot: 
		ConfigIsDev ? UseLocalVmTestConfig ? 'https://10.0.2.2\\:4443/api/v1' : 'https://myadnat.co.uk\\:4443/api/v1'  
		: 'https://myadnat.co.uk\\:443/api/v1',
	urlHttpServicesRoot: 
		ConfigIsDev ? UseLocalVmTestConfig ? 'https://10.0.2.2:4443/api/v1' : 'https://myadnat.co.uk:4443/api/v1'  
		: 'https://myadnat.co.uk:443/api/v1',
	urlPersons: 
		ConfigIsDev ? UseLocalVmTestConfig ? 'https://10.0.2.2:4443/api/v1/persons' : 'https://myadnat.co.uk:4443/api/v1/persons'  
		: 'https://myadnat.co.uk/api/v1/persons',
	urlLogin: 
		ConfigIsDev ? UseLocalVmTestConfig ? 'https://10.0.2.2:4443/login' : 'https://auth.myadnat.co.uk:4443/login'  
		: 'https://auth.myadnat.co.uk/login',
	urlLogout: 
		ConfigIsDev ? UseLocalVmTestConfig ? 'https://10.0.2.2:4443/logout'  : 'https://auth.myadnat.co.uk:4443/logout'  
		: 'https://auth.myadnat.co.uk/logout',
	urlProfile: 
		ConfigIsDev ? UseLocalVmTestConfig ? 'https://10.0.2.2:4443/profile' : 'https://auth.myadnat.co.uk:4443/profile'  
		: 'https://auth.myadnat.co.uk/profile',
	urlSubject: 
		ConfigIsDev ? UseLocalVmTestConfig ? 'https://10.0.2.2:4443/api/v1/subject' : 'https://myadnat.co.uk:4443/api/v1/subject'  
		: 'https://myadnat.co.uk/api/v1/subject'
};

