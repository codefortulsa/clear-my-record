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


$('.download-pdf').click(function () {
    // Don't forget, that there are CORS-Restrictions. So if you want to run it without a Server in your Browser you need to transform the image to a dataURL
// Use http://dataurl.net/#dataurlmaker
    var doc = new jsPDF();
    doc.text('Hello world!', 20, 20);
    doc.text('This is client-side Javascript, pumping out a PDF.', 20, 30);
    doc.addPage('a6', 'l');
    doc.text('Do you like that?', 20, 20);
    doc.save('test.pdf');
    // savePDF(doc);
});

// function savePDF (doc) {
//     // $('.download-pdf').click(function () {
//         // eval('try{' + editor.getValue() + '} catch(e) { console.error(e.message,e.stack,e); }');

//         var file = demos[$('#template').val()];
//         // if (file === undefined) {
//         //     file = 'demo';
//         // }
//         if (typeof doc !== 'undefined') {
//             doc.save(file + '.pdf');
//         } else if (typeof pdf !== 'undefined') {
//             setTimeout(function () {
//                 pdf.save(file + '.pdf');
//             }, 2000);
//         } else {
//             alert('Error 0xE001BADF');
//         }
//     // });
//     // return false;
// }