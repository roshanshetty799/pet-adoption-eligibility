const testData_AdoptionEligibility = [
    {
        "family": [{"name": "Drake", "postCode": "3032"}],
        "parent": [{"firstName": "Mark", "lastName": "Smith", "favouriteColour": "yellow"}],
        "child": [{"firstName": "Dan", "lastName": "Smith", "favouriteToy": "Toy Horse"}],
        "dogEligibility": "Y",
        "numberOfDogs": "1"
    },
    {
        "family": [{"name": "Drake", "postCode": "3032"}],
        "parent": [{"firstName": "Mark", "lastName": "Smith", "favouriteColour": "yellow"},
            {"firstName": "Sarah", "lastName": "Smith", "favouriteColour": "yellow"}],
        "child": [{"firstName": "Dan", "lastName": "Smith", "favouriteToy": "Toy Horse"}],
        "dogEligibility": "Y",
        "numberOfDogs": "2"
    },
    {
        "family": [{"name": "Drake", "postCode": "3032"}],
        "parent": [{"firstName": "Mark", "lastName": "Smith", "favouriteColour": "yellow"}],
        "child": [{"firstName": "Dan", "lastName": "Smith", "favouriteToy": "Toy Horse"},
            {"firstName": "Emma", "lastName": "Smith", "favouriteToy": "Toy Cat"}],
        "dogEligibility": "N",
        "numberOfDogs": "0"
    },
    {
        "family": [{"name": "Drake", "postCode": "3032"}],
        "parent": [{"firstName": "Mark", "lastName": "Smith", "favouriteColour": "yellow"},
            {"firstName": "Sarah", "lastName": "Smith", "favouriteColour": "yellow"}],
        "child": [{"firstName": "Dan", "lastName": "Smith", "favouriteToy": "Toy Horse"},
            {"firstName": "Emma", "lastName": "Smith", "favouriteToy": "Toy Cat"}],
        "dogEligibility": "Y",
        "numberOfDogs": "1"
    },
    {
        "family": [{"name": "Drake", "postCode": "3032"}],
        "parent": [{"firstName": "Mark", "lastName": "Smith", "favouriteColour": "yellow"},
            {"firstName": "Sarah", "lastName": "Smith", "favouriteColour": "yellow"}],
        "child": [{"firstName": "Dan", "lastName": "Smith", "favouriteToy": "Toy Horse"},
            {"firstName": "Emma", "lastName": "Smith", "favouriteToy": "Toy Cat"},
            {"firstName": "Jen", "lastName": "Smith", "favouriteToy": "Toy Cat"}],
        "dogEligibility": "N",
        "numberOfDogs": "0"
    },
    {
        "family": [{"name": "Drake", "postCode": "3032"}],
        "parent": [{"firstName": "Mark", "lastName": "Smith", "favouriteColour": "green"}],
        "child": [{"firstName": "Dan", "lastName": "Smith", "favouriteToy": "Toy Horse"}],
        "dogEligibility": "N",
        "numberOfDogs": "0"
    },
    {
        "family": [{"name": "Drake", "postCode": "3032"}],
        "parent": [{"firstName": "Mark", "lastName": "Smith", "favouriteColour": "yellow"},
            {"firstName": "Sarah", "lastName": "Smith", "favouriteColour": "green"}],
        "child": [{"firstName": "Dan", "lastName": "Smith", "favouriteToy": "Toy Horse"}],
        "dogEligibility": "N",
        "numberOfDogs": "0"
    },
    {
        "family": [{"name": "Drake", "postCode": "3032"}],
        "parent": [{"firstName": "Mark", "lastName": "Smith", "favouriteColour": "green"}],
        "child": [{"firstName": "Dan", "lastName": "Smith", "favouriteToy": "Toy Horse"},
            {"firstName": "Emma", "lastName": "Smith", "favouriteToy": "Toy Cat"}],
        "dogEligibility": "N",
        "numberOfDogs": "0"
    },
    {
        "family": [{"name": "Drake", "postCode": "3032"}],
        "parent": [{"firstName": "Mark", "lastName": "Smith", "favouriteColour": "green"},
            {"firstName": "Sarah", "lastName": "Smith", "favouriteColour": "yellow"}],
        "child": [{"firstName": "Dan", "lastName": "Smith", "favouriteToy": "Toy Horse"},
            {"firstName": "Emma", "lastName": "Smith", "favouriteToy": "Toy Cat"}],
        "dogEligibility": "N",
        "numberOfDogs": "0"
    },
    {
        "family": [{"name": "Drake", "postCode": "3032"}],
        "parent": [{"firstName": "Mark", "lastName": "Smith", "favouriteColour": "green"},
            {"firstName": "Sarah", "lastName": "Smith", "favouriteColour": "yellow"}],
        "child": [{"firstName": "Dan", "lastName": "Smith", "favouriteToy": "Toy Horse"},
            {"firstName": "Emma", "lastName": "Smith", "favouriteToy": "Toy Cat"},
            {"firstName": "Jen", "lastName": "Smith", "favouriteToy": "Toy Cat"}],
        "dogEligibility": "N",
        "numberOfDogs": "0"
    },
]

/**
 *  The below spec covers scenarios for RULE 1 & RULE 2
 *
 */
describe(`Verify if the family is eligible for a dog adoption`, () => {

    /**
     *  Iterates through the list above where each row is the pre-req data for the scenario
     *
     */
    testData_AdoptionEligibility.forEach((row) => {

        /**
         *  Scenario description is parameterized so that it's clear in reporting what
         *  the family structure is i.e. total adults, children and parent(s) favourite colour
         */
        it(`A family with ${row['parent'].length} Parent and ${row['child'].length} ${row['child'].length === 1 ? 'child' : 'children'}, 
          where ${row['parent'].length === 1 ? 'parent\'s favourite colour is ' + row['parent'][0]['favouriteColour'] :
            'parent one colour is ' + row['parent'][0]['favouriteColour'] + ' and parent two colour is ' + row['parent'][1]['favouriteColour']} `, () => {

            /**
             *  Create a new family
             */
            cy.request(`POST`, `/family`, {
                "name": row["family"][0]["name"],
                "postCode": row["family"][0]["postCode"]
            }).then((response) => {

                const familyId = response.body['id'];

                /**
                 *  Add parent(s) to the family
                 */
                row["parent"].forEach((parent) => {
                    cy.request(`POST`, `/parent`, {
                        "familyId": familyId,
                        "firstName": parent['firstName'],
                        "lastName": parent['lastName'],
                        "favouriteColour": parent['favouriteColour']
                    })
                })

                /**
                 *  Add child / children to the family
                 */
                row["child"].forEach((child) => {
                    cy.request(`POST`, `/child`, {
                        "familyId": familyId,
                        "firstName": child['firstName'],
                        "lastName": child['lastName'],
                        "favouriteToy": child['favouriteToy']
                    })
                })

                /**
                 *  Return family eligibility details for the family added
                 *  in the above steps
                 */
                cy.request(`/family/${familyId}/eligibility`).then((response) => {

                    expect(response.body['allowedDog'].toString(),
                        `Expected 'allowedDog' to be ${row['dogEligibility']}. Found :- ${response.body['allowedDog']}`).to.equal(row['dogEligibility'].toString());
                    expect(response.body['numberOfDogs'].toString(),
                        `Expected 'numberOfDogs' to be ${row['numberOfDogs']}. Found :- ${response.body['numberOfDogs']}`).to.equal(row['numberOfDogs'].toString());
                })


            })

        })
    })

})


