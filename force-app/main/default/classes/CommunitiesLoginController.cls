global with sharing class CommunitiesLoginController {

 public String password { get; set; }

 public String username { get; set; }

 global CommunitiesLoginController () {}

 global PageReference forwardToAuthPage() {

 String startUrl = System.currentPageReference().getParameters().get('startURL');

 String displayType = System.currentPageReference().getParameters().get('display');

 return Network.forwardToAuthPage(startUrl, displayType);

 }

 global PageReference RedirectToLogin()

 {

 return new PageReference( '/apex/CustomLogin');

 /* 'Custom' is the name of the VF Page for login that is created below */

 }

 public PageReference loginUser()

 {

 return Site.login(username, password,null);

 /* 'NeedSupport'  is the Page to which we will be redirected after Login */

 }

 }