import '@laylazi/bootstrap-rtl/dist/css/bootstrap-rtl.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './css/style.css';
import './scss/style.scss';
import 'webpack-jquery-ui';
import 'webpack-jquery-ui/css';
import 'jquery-ui-touch-punch/jquery.ui.touch-punch';
import 'jquery/dist/jquery.min';
import 'popper.js/dist/popper.min';
import 'bootstrap/dist/js/bootstrap.min.js';
import '@fortawesome/fontawesome-free/js/all.js';


$(function () {
    $('[data-toggle="tooltip"]').tooltip();

    $('.add-to-cart-btn').on('click', function () {
        alert('لقد تمت إضافة المنتج الى العربة بنجاح');
    });

    $('#copyright').text("جميع الحقوق محفوظة سنة " + new Date().getFullYear());

    $('.product-option input[type="radio"]').on('change', function () {
        $(this).parents('.product-option').siblings().removeClass('active');
        $(this).parents('.product-option').addClass('active');
    });

    $('[data-product-quantity]').on('change', function () {
        var newQuantity = $(this).val();
        var parent = $(this).parents('[data-product-info]');
        var pricePerUnit = parent.attr('data-product-price');
        var totalPriceForProduct = newQuantity * pricePerUnit;
        parent.find(".total-price-for-product").text(totalPriceForProduct + "$");
        calculateTotalPrice();
    });

    $('[data-remove-from-cart]').on('click', function () {
        $(this).parents('[data-product-info]').remove();
        calculateTotalPrice();
    });

    function calculateTotalPrice() {
        var totalPriceForAllProduct = 0;
        $('[data-product-info]').each(function () {
            var pricePerUnit = $(this).attr('data-product-price');
            var quantity = $(this).find('[data-product-quantity]').val();
            var totalPriceForProduct = pricePerUnit * quantity;
            totalPriceForAllProduct = totalPriceForAllProduct + (totalPriceForProduct);
        });
        $('.total-price-for-all').text(totalPriceForAllProduct);
    }

    var citiesByCountry = {
        eg: ['القاهرة', 'الاسكندرية'],
        jo: ['عمان', 'الزرقاء', 'اربد'],
        kw: ['الكويت', 'الاحمدي'],
        lb: ['بيروت', 'طرابلس', 'جبيل', 'صيدا'],
        sa: ['الرياض', 'جدة', 'الدمام', 'المدينة'],
        sy: ['الشام', 'دمشق', 'حلب', 'حمص']
    };

    $('#form-checkout select[name="country"]').on('change', function () {
        var country = $(this).val();
        var cities = citiesByCountry[country];
        $('#form-checkout select[name="city"]').empty();
        $('#form-checkout select[name="city"]').append(' <option disabled selected value="">اختر مدينة</option>');
        cities.forEach(city => {
            var newOption = $('<option></option>');
            newOption.text(city);
            newOption.val(city);
            $('#form-checkout select[name="city"]').append(newOption);
        });
    });

    $('#form-checkout input[name="payment_method"]').on('change', function () {
        var paymentMethod = $(this).val();
        if (paymentMethod === 'cash') {
            $('#credit-card-info input').prop('disabled', true);
        } else {
            $('#credit-card-info input').prop('disabled', false);
        }
        $('#credit-card-info').toggle();
    });

    $("#slider-range").slider({
        range: true,
        min: 50,
        max: 1000,
        step: 10,
        values: [100, 800],
        slide: function (event, ui) {
            $('#min-price').text(ui.values[0]);
            $('#max-price').text(ui.values[1]);
        }
    });
});
