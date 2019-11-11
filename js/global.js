(function ($) {
    'use strict';
    /*==================================================================
        [ Daterangepicker ]*/
    try {
        $('.js-datepicker').daterangepicker({
            "singleDatePicker": true,
            "showDropdowns": true,
            "autoUpdateInput": false,
            locale: {
                format: 'DD/MM/YYYY'
            },
        });

        var myCalendar = $('.js-datepicker');
        var isClick = 0;

        $(window).on('click',function(){
            isClick = 0;
        });

        $(myCalendar).on('apply.daterangepicker',function(ev, picker){
            isClick = 0;
            $(this).val(picker.startDate.format('DD/MM/YYYY'));

        });

        $('.js-btn-calendar').on('click',function(e){
            e.stopPropagation();

            if(isClick === 1) isClick = 0;
            else if(isClick === 0) isClick = 1;

            if (isClick === 1) {
                myCalendar.focus();
            }
        });

        $(myCalendar).on('click',function(e){
            e.stopPropagation();
            isClick = 1;
        });

        $('.daterangepicker').on('click',function(e){
            e.stopPropagation();
        });


    } catch(er) {console.log(er);}
    /*[ Select 2 Config ]
        ===========================================================*/

    try {
        var selectSimple = $('.js-select-simple');

        selectSimple.each(function () {
            var that = $(this);
            var selectBox = that.find('select');
            var selectDropdown = that.find('.select-dropdown');
            selectBox.select2({
                dropdownParent: selectDropdown
            });
        });

    } catch (err) {
        console.log(err);
    }


})(jQuery);



window.onload = (event) => {
  console.log('page is fully loaded');
    //const/let switcheroo
    $('.download-pdf').click(function () {

        var petitioner = getPetitioner();
        var doc = new jsPDF();
        doc.setFontSize(9);
        doc.text(hbDocPrint(petitioner), 10, 20);
        doc.save(petitioner.firstName +'-Petition.pdf');
        console.log('Success');
    });

};

function getValueById(id){
    var element = $('#petitioner-'+id);
    if( element != null && element.length > 0){
        console.log(element[0].value);
        return element[0].value;
    }
    return null;
}

function getPetitioner(){
    let petitioner = {
        firstName: getValueById('first'),
        lastName: getValueById('last'),
        middleName: getValueById('middle'),
        street1: getValueById('street1'),
        street2: getValueById('street2'),
        city: getValueById('city'),
        state: getValueById('state'),
        zipcode: getValueById('zip'),
        phone1: getValueById('phone1'),
        DoB: getValueById('dateOfBirth'),
        SSN: getValueById('social'),
        county: getValueById('county'),
        arrestingAgencyID: getValueById('case-agency'),
        dateOfArrest: getValueById('dateOfArrest'),
        caseNo: getValueById('case-no'),
        charges: getValueById('charges'),
    };
    return petitioner;
}
function printVariable(id,value){
    return id +"\n " + value + "\n\n";
}

function printPetitioner(petitioner){
    let output = "Petitioner Information \n";
    output += printVariable("First Name", petitioner.firstName);
    output += printVariable("Last Name", petitioner.lastName);
    output += printVariable("Middle Name", petitioner.middleName);
    output += "Address\n";
    output +=  printVariable("Line 1", petitioner.street1);
    output +=  printVariable("Line 2", petitioner.street2);
    output +=  printVariable("City", petitioner.city);
    output +=  printVariable("State", petitioner.state);
    output += printVariable("Zip", petitioner.zipcode);
    output += "Personal Information\n";
    output += printVariable("Social Security Number", petitioner.SSN);
    output += printVariable("Date of Birth", petitioner.DoB);
    output += printVariable("Phone 1", petitioner.phone1);
    output += "Case Information \n";
    output += printVariable("County", petitioner.county);
    output += printVariable("Agency", petitioner.arrestingAgencyID);
    output += printVariable("Date of Arrest", petitioner.dateOfArrest);
    output += printVariable("Case Number", petitioner.caseNo);
    output += printVariable("Charges", petitioner.charges);
    return output;
}

function hbDocPrintTest(petitioner){
    var docText =    `IN THE DISTRICT COURT OF ${petitioner.county} COUNTY`;
    return docText;
}

function hbDocPrint(petitioner){
    var docText =
    `IN THE DISTRICT COURT OF ${petitioner.county} COUNTY
STATE OF OKLAHOMA

 Case No. __${petitioner.caseNo}_____  ___________________
___________________,

Petitioner,

vs.
THE STATE OF OKLAHOMA,

Respondent.

PETITION TO EXPUNGE RECORDS PURSUANT TO TITLE 22 O.S. SECTIONS 18 AND 19

COMES NOW, the Petitioner and respectfully moves this Court to expunge the criminal history records of the Petitioner
pursuant to paragraph 15 of subsection A of Section 18 and Section 19 of Title 22 of the Oklahoma Statutes.

PETITIONER INFORMATION:

${petitioner.lastName}, ${petitioner.firstName} ${petitioner.middleName}
 (Last name) (First name) (Middle name)

${petitioner.street1}
${petitioner.street2}
${petitioner.city}, ${petitioner.state} ${petitioner.zipcode}
 (Address)

 ${petitioner.phone1}
(Primary Phone)

 _${petitioner.DoB}__${petitioner.SSN}_________
(Date of Birth) (Social Security Number)

CRIMINAL CASE INFORMATION:

Name and Address of Arresting Agency:
_____${petitioner.arrestingAgencyID}______________________________
_____[Petitioner.ArrestingAgencyID - > Agency.Address]____________________________
Date of Arrest: __${petitioner.dateOfArrest}__

Name and Address of Other Agency:

(List any state or local government agency that has a record of your case.)

_[Peititioner.ID -> AsociatedAgency.Order[0] -> Agency.Name] - [Agency.Address]________ ________________
_[Peititioner.ID -> AsociatedAgency.Order[1] -> Agency.Name] - [Agency.Address]________ ________________
_[Peititioner.ID -> AsociatedAgency.Order[2] -> Agency.Name]  - [Agency.Address]________ ________________

Case Number to be Expunged: ${petitioner.caseNo}

Charge to be Expunged: ${petitioner.charges}

* Information on your criminal case may be found at www.oscn.net.

I, the above-named Petitioner, hereby petition this Court for an expungement of criminal records pursuant to paragraph 15
of subsection A of Section 18 of Title 22 of the Oklahoma Statutes and certify as follows:

1. In this court of the county named above, I was charged and convicted of a nonviolent felony offense not listed in
Section 571 of Title 57 of the Oklahoma Statutes;

2. That the nonviolent felony offense I was charged and convicted of has been reclassified as a misdemeanor offense under
Oklahoma law;

3. That I am not currently serving a sentence for a crime in this state or another state;

4. At least thirty (30) days have passed since either the completion of my sentence or the commutation of my sentence for
the crime that was reclassified as a misdemeanor;

5. That all restitution (if any) ordered by the court to be paid by me in this case has been satisfied in full;

6. That I have successfully completed any and all treatment program(s) ordered by the court, successfully completed an
accelerated or revoked sentence or successfully completed a treatment program at a later date; and

7. That the harm to the Petitioner’s privacy or danger of unwarranted adverse consequences outweighs the public’s interest
in retaining said records.

I declare under penalty of perjury that the statements made herein are true and correct to the best of my knowledge,
information and belief.




________________________________________________
Date Signature of Petitioner Name
(Print): ${petitioner.firstName} ${petitioner.middleName} ${petitioner.lastName}
`;
return docText;
}
