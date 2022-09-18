
Hi Lachlan,

Hope you are well.


You can find the RTM and cypress tests under cypress > e2e. Based on the given requirements,
I identified two major areas of testing : 

- The Adoption eligibility returns the right stats for different family structures.

- The API's handle valid / invalid calls accordingly with the right responses. 


My strategy was to design test cases which consider both the rules, as to be eligible both have to
to be satisfied. Also, I would test the API(s) first to ensure they are working correctly. I have covered the 
Adoption eligibility feature in Cypress e2e however it does not include scenarios to test the API calls 
individually for various success / error responses in the interest of 
saving time.
   

I have never used Cypress before until today, so it took more time than I anticipated 
to get it set up. Mostly because I was getting distracted playing around with all the tools 
that it offers out of the box :D. It was easy to sign in to the cloud dashboard so I just used 
that for reporting over setting one up locally. If you wish to run the report run the following in terminal :
  _cypress run --record --key ab8b8fc2-a8f8-4c1e-ab47-7ccea94c93b9_

  
The report for the latest run can be found here : https://dashboard.cypress.io/projects/jzn1w5/runs/4/test-results?


I did not spend time researching cypress best practices nor spend too much time refactoring however have 
ensured that standard coding practices are followed and that it's scalable. So the design makes 
report easy to read and to add more scenarios one only has to add family details in test data. Another way to map
the requirement would have been a BDD approach in Cucumber , where the step defs are defined in cypress.  

Thanks,
Roshan



