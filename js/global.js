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
        
        var petitioner = getPetitioner()
        var doc = new jsPDF();
        doc.text(printPetitioner(petitioner), 20, 20);
        doc.save(petitioner.firstName +'-Petition.pdf');
        console.log('Success')
    });

};

function getValueById(id){
    var element = $('#petitioner-'+id)
    if( element != null && element.length > 0){
        console.log(element[0].value)
        return element[0].value
    }
    return null
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
        phone1: getValueById(''),
        phone2: getValueById('phone1'),
        county: getValueById('phone2'),
        arrestingAgencyID: getValueById('case-agency'),
        dateOfArrest: getValueById('dateOfArrest'),
        caseNo: getValueById('case-id'),
        charges: getValueById('charges'),
    }
    return petitioner;
}
function printVariable(id,value){
    return id +": " + value + "\n"
}

function printPetitioner(petitioner){
    let output = "Petitioner Information \n"
    output += printVariable("First Name", petitioner.firstName)
    output += printVariable("Last Name", petitioner.lastName)
    output += printVariable("Middle Name", petitioner.middleName)
    output += "Address\n"
    output +=  printVariable("Line 1", petitioner.street1)
    output +=  printVariable("Line 2", petitioner.street2)
    output +=  printVariable("City", petitioner.city)
    output +=  printVariable("State", petitioner.state)
    output += printVariable("Zip", petitioner.zipcode)
    output += printVariable("Phone 1", petitioner.phone1)
    output += printVariable("Phone 2", petitioner.phone2)
    output += "Case Information \n"
    output += printVariable("County", petitioner.county)
    output += printVariable("Agency", petitioner.arrestingAgencyID)
    output += printVariable("Date of Arrest", petitioner.dateOfArrest)
    output += printVariable("Case Number", petitioner.caseNo)
    output += printVariable("Charges", petitioner.charges)
    return output
}
