let address = "uploads/nipc";
$(document).ready(function () {
    const disabledMenu = document.querySelector('#menu-4');
    let fontSize = 100;
    let shbnamAdded = false;
    const shabnamFonts = `@font-face {font-family: IRANSans;src: url('${address}/fonts/Shabnam-FD.woff') format('woff') ;font-weight: normal;font-style: normal;font-display: swap;} @font-face {font-family: IRANSans;src: url('${address}/fonts/Shabnam-Bold-FD.woff') format('woff')  ;font-weight: bold;font-style: normal;font-display: swap;} @font-face {font-family: IRANSans;src: url('${address}/fonts/Shabnam-Medium-FD.woff') format('woff')  ;font-weight: 500;font-style: normal;font-display: swap;}`;
    let sahelAdded = false;
    const sahelFonts = `@font-face {font-family: IRANSans;src: url('${address}/fonts/Sahel-FD.woff') format('woff') ;font-weight: normal;font-style: normal;font-display: swap;} @font-face {font-family: IRANSans;src: url('${address}/fonts/Sahel-Bold-FD.woff') format('woff')  ;font-weight: bold;font-style: normal;font-display: swap;} @font-face {font-family: IRANSans;src: url('${address}/fonts/Sahel-SemiBold-FD.woff') format('woff')  ;font-weight: 500;font-style: normal;font-display: swap;}`;
    let IranSansAdded = false;
    const IranSansFonts = `@font-face {font-family: IRANSans;src: url('${address}/fonts/IRANSansWeb\(FaNum\).woff2') format('woff') ;font-weight: normal;font-style: normal;font-display: swap;} @font-face {font-family: IRANSans;src: url('${address}/fonts/IRANSansWeb\(FaNum\)_Bold.woff2') format('woff')  ;font-weight: bold;font-style: normal;font-display: swap;} @font-face {font-family: IRANSans;src: url('${address}/fonts/IRANSansWeb\(FaNum\)_Medium.woff2') format('woff')  ;font-weight: 500;font-style: normal;font-display: swap;}`;


    disabledMenu.addEventListener('click', function (e) {
        //Fonts Change
        if (e.target.id == 'Sahel') {
            if (!sahelAdded) {
                sahelAdded = true;
                document.querySelector('head').innerHTML += `<style>${sahelFonts}</style>`;
            }
            document.body.style.fontFamily = 'Sahel !important';
        }

        if (e.target.id == 'IranSans') {
            if (!IranSansAdded) {
                IranSansAdded = true;
                document.querySelector('head').innerHTML += `<style>${IranSansFonts}</style>`;
            }
            document.body.style.fontFamily = 'Shabnam !important';
        }
        if (e.target.id == 'Shabnam') {
            if (!shbnamAdded) {
                shbnamAdded = true;
                document.querySelector('head').innerHTML += `<style>${shabnamFonts}</style>`;
            }
            document.body.style.fontFamily = 'Shabnam !important';
        }

    });
});
