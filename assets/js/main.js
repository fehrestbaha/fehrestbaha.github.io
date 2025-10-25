// فعال‌سازی منوی همبرگری و منطق فیلترینگ
$(function() {
    'use strict';
    
    // نگاشت (Mapping) بین رسته اصلی و رشته‌های تخصصی
    var categoryFieldMap = {
        'ساختمان': [
            { value: 'ابنیه', text: 'ابنیه' },
            { value: 'مکانیکی', text: 'تأسیسات مکانیکی' },
            { value: 'برقی', text: 'تأسیسات برقی' },
            { value: 'مرمت بناهای تاریخی', text: 'مرمت بناهای تاریخی' }
        ],
        'راه و ترابری': [
            { value: 'راه،راه آهن و باند فرودگاه', text: 'راه،راه آهن و باند فرودگاه' },
            { value: 'راهداری', text: 'راهداری' },
            { value: 'ترمیم و بازسازی نوار حفاری در معابر شهری', text: 'ترمیم و بازسازی نوار حفاری در معابر شهری' },
            { value: 'تجمیعی راه، باندفرودگاه و راه آهن', text: 'تجمیعی راه، باندفرودگاه و راه آهن' },
           
            // اگر رشته‌های 'خطوط انتقال آب' و 'آبیاری تحت فشار' کلاس دارند، اینجا اضافه شوند.
            // مثال: { value: 'آبیاری', text: 'آبیاری تحت فشار' }
        ],
        'مهندسی آب': [
            { value: 'تجهیزات آب و فاضلاب', text: 'تجهیزات آب و فاضلاب' },
            { value: 'خطوط انتقال آب', text: 'خطوط انتقال آب' },
            { value: 'شبکه توزیع آب', text: 'شبکه توزیع آب' },
            { value: 'چاه', text: 'چاه' },
            { value: 'آبیاری و زهکشی', text: 'آبیاری و زهکشی' },
            { value: 'سد سازی', text: 'سد سازی' },
            { value: 'بهره برداری و نگهداری از شبکه جمع آوری و انتقال فاضلاب', text: 'بهره برداری و نگهداری از شبکه جمع آوری و انتقال فاضلاب' },
            { value: 'شبکه جمع آوری و انتقال فاضلاب', text: 'شبکه جمع آوری و انتقال فاضلاب' },
            { value: 'انتقال و توزیع آب روستایی', text: 'انتقال و توزیع آب روستایی' },
            { value: 'ساخت و ترمیم قنات', text: 'ساخت و ترمیم قنات' }
        ],
        'کشاورزی و منابع طبیعی': [
            { value: 'آبیاری تحت فشار', text: 'آبیاری تحت فشار' },
            { value: 'آبخیزداری و منابع طبیعی', text: 'آبخیزداری و منابع طبیعی' },
            { value: 'بهره برداری و نگهداری تاسیسات آب شرب', text: 'بهره برداری و نگهداری تاسیسات آب شرب' },
            { value: 'بهره‌برداری و نگهداشت تجهیزات برقی، کنترلی و ابزار دقیق تاسیسات آب و فاضلاب', text: 'بهره‌برداری و نگهداشت تجهیزات برقی، کنترلی و ابزار دقیق تاسیسات آب و فاضلاب' }
        ],
        'نیرو': [
            { value: 'خطوط زمینی انتقال و فوق توزیع نیروی برق', text: 'خطوط زمینی انتقال و فوق توزیع نیروی برق' },
            { value: 'خطوط هوایی انتقال و فوق توزیع نیروی برق', text: 'خطوط هوایی انتقال و فوق توزیع نیروی برق' },
            { value: 'پست های انتقال و فوق توزیع نیروی برق', text: 'پست های انتقال و فوق توزیع نیروی برق' },
            { value: 'نگهداری و تعمیرات شبکه انتقال و فوق توزیع نیروی برق', text: 'نگهداری و تعمیرات شبکه انتقال و فوق توزیع نیروی برق' },
            { value: 'توزیع نیروی الکتریکی (برق)', text: 'توزیع نیروی الکتریکی (برق)' }
        ],
        'معدن': [
            { value: 'حفاری اکتشافی', text: 'حفاری اکتشافی' },
            { value: '', text: '' }
        ],
        'مدیریت شهری و روستایی': [
            { value: 'فضای سبز', text: 'فضای سبز' },
            { value: 'پسماند', text: 'پسماند' }
        ]
    };

    // -------------------------------------------------
    // ۱. کدهای عمومی و موبایل
    // -------------------------------------------------
    $('.menu-toggle').on('click', function() {
        $('.header-container').toggleClass('nav-open');
        var isExpanded = $('.header-container').hasClass('nav-open');
        $(this).attr('aria-expanded', isExpanded);
    });
    
    $('#main-nav a').on('click', function() {
        if ($(window).width() < 992) {
             $('.header-container').removeClass('nav-open');
             $('.menu-toggle').attr('aria-expanded', 'false');
        }
    });

    // =================================================
    // ۲. منطق فیلترینگ برای بخش فهرست بهای ۱۴۰۴
    // =================================================
    function applyFilter1404() {
        var category = $('#filter-category-1404').val();
        var format = $('#filter-format-1404').val();
        
        $('.faharest-list-1404 tbody tr').show().find('td').show(); 
        
        $('.faharest-list-1404 tbody tr').each(function() {
            var $row = $(this);
            var categoryMatch = (category === 'all' || $row.hasClass(category));
            
            if (!categoryMatch) {
                $row.hide();
            } else {
                if (format === 'pdf') {
                    $row.find('td.excel').hide();
                } else if (format === 'excel') {
                    $row.find('td.pdf').hide();
                }
            }
        });
    }

    $('#filter-category-1404, #filter-format-1404').on('change', applyFilter1404);
    applyFilter1404(); 


    // =================================================
    // ۳. منطق فیلترینگ و Pagination برای بخش آرشیو
    // =================================================
    
    var itemsPerPage = 30; 
    var currentPage = 1;
    var $allArchiveItems = $('.faharest-archive-list tbody tr').clone(); 
    var $filteredItems = $allArchiveItems; 
    var totalPages;

    // تابع کمکی برای تبدیل فارسی به انگلیسی
    function toEnglishNumber(str) {
        return str.replace(/[\u06F0-\u06F9]/g, function (d) {
            return d.charCodeAt(0) - 1776;
        });
    }

    // *** منطق جدید: به‌روزرسانی منوی رشته تخصصی بر اساس رسته اصلی ***
    function populateSpecializedFields() {
        var selectedCategory = $('#archive-category').val();
        var $fieldDropdown = $('#archive-type');
        
        // ذخیره مقدار فعلی رشته تخصصی
        var currentFieldValue = $fieldDropdown.val();

        // پاک کردن منو و اضافه کردن گزینه "همه"
        $fieldDropdown.empty();
        $fieldDropdown.append($('<option>', { value: 'all', text: 'همه رشته‌ها' }));
        
        if (selectedCategory !== 'all' && categoryFieldMap[selectedCategory]) {
            $.each(categoryFieldMap[selectedCategory], function(i, field) {
                $fieldDropdown.append($('<option>', { 
                    value: field.value, 
                    text: field.text 
                }));
            });
            
            // تلاش برای حفظ انتخاب فعلی یا ریست به "همه"
            if ($fieldDropdown.find('option[value="' + currentFieldValue + '"]').length) {
                 $fieldDropdown.val(currentFieldValue);
            }
        }
    }
    
    // اتصال تابع به تغییر رسته اصلی
    $('#archive-category').on('change', function() {
        populateSpecializedFields();
        filterArchiveItems(); // فیلترینگ اصلی را پس از تغییر رشته‌ها اجرا کن
    });
    
    // تابع اصلی فیلترینگ
    function filterArchiveItems() {
        var category = $('#archive-category').val();
        var type = $('#archive-type').val();
        var yearFilterValue = $('#archive-year').val(); 
        
        // مرحله ۱: فیلتر کردن ردیف‌ها
        $filteredItems = $allArchiveItems.filter(function() {
            var $row = $(this);
            
            // الف) فیلتر رسته و رشته (بر اساس کلاس)
            var categoryMatch = (category === 'all' || $row.hasClass(category));
            var typeMatch = (type === 'all' || $row.hasClass(type));
            
            // ب) فیلتر سال/دهه
            var yearMatch = (yearFilterValue === 'all');
            if (yearFilterValue !== 'all') {
                var rowYearClass = $row.attr('class').match(/\b(13|14)\d{2}\b/);
                var rowYear = rowYearClass ? parseInt(rowYearClass[0]) : null;

                if (rowYear && (yearFilterValue === rowYear.toString())) { 
                    yearMatch = true;
                } else if (rowYear) {
                    // بررسی دهه‌ها
                    if (yearFilterValue === '1390' && rowYear >= 1390 && rowYear <= 1399) yearMatch = true;
                    else if (yearFilterValue === '1380' && rowYear >= 1380 && rowYear <= 1389) yearMatch = true;
                    else if (yearFilterValue === '1370' && rowYear >= 1370 && rowYear <= 1379) yearMatch = true;
                }
            }
            
            return categoryMatch && typeMatch && yearMatch;
        });

        currentPage = 1; // ریست صفحه پس از فیلتر جدید
        totalPages = Math.ceil($filteredItems.length / itemsPerPage);
        updateArchiveTable();
    }

    // تابع به‌روزرسانی جدول و صفحه‌بندی
    function updateArchiveTable() {
        var start = (currentPage - 1) * itemsPerPage;
        var end = start + itemsPerPage;
        
        var $visibleItems = $filteredItems.slice(start, end).clone(); 
        
        $('#archive-table-body').empty().append($visibleItems);

        // اعمال فیلتر فرمت (پنهان/آشکار کردن ستون‌ها)
        var format = $('#archive-format').val();
        $visibleItems.find('td.pdf, td.excel').show(); 
        if (format === 'pdf') {
            $visibleItems.find('td.excel').hide();
        } else if (format === 'excel') {
            $visibleItems.find('td.pdf').hide();
        }
        
        // به‌روزرسانی کنترل‌های Pagination
        var displayTotalItems = $filteredItems.length;
        var displayTotalPages = totalPages === 0 ? 1 : totalPages;
        
        $('#page-info').text('صفحه ' + (displayTotalItems === 0 ? 0 : currentPage) + ' از ' + displayTotalPages + ' (تعداد کل: ' + displayTotalItems + ')');
        
        var isDisabled = totalPages <= 1 || totalPages === 0;
        $('.pagination-controls button').prop('disabled', true);

        if (displayTotalItems > 0 && totalPages > 1) {
             $('.pagination-controls button').prop('disabled', false); 
             $('#prev-page, #first-page').prop('disabled', currentPage === 1);
             $('#next-page, #last-page').prop('disabled', currentPage === totalPages);
        }
        
    }
    
    // مدیریت دکمه‌های صفحه‌بندی
    $('#prev-page').on('click', function() { if (currentPage > 1) { currentPage--; updateArchiveTable(); } });
    $('#next-page').on('click', function() { if (currentPage < totalPages) { currentPage++; updateArchiveTable(); } });
    $('#first-page').on('click', function() { if (currentPage !== 1) { currentPage = 1; updateArchiveTable(); } });
    $('#last-page').on('click', function() { if (currentPage !== totalPages) { currentPage = totalPages; updateArchiveTable(); } });

    // گوش دادن به تغییرات سایر فیلترهای آرشیو
    $('#archive-type, #archive-year, #archive-format').on('change', function() {
        filterArchiveItems();
    });

    // فراخوانی اولیه
    if ($allArchiveItems.length > 0) {
        // ۱. اضافه کردن کلاس‌های سالی با عدد انگلیسی به کلون‌های اصلی
        $allArchiveItems.each(function() {
             var rowYearText = $(this).find('td:first').text().trim();
             var rowYear = toEnglishNumber(rowYearText);
             $(this).addClass(rowYear);
        });
        
        // ۲. پر کردن منوی رشته تخصصی (در ابتدا همه رسته‌ها)
        populateSpecializedFields();
        
        // ۳. اجرای فیلتر اولیه
        filterArchiveItems(); 
    } else {
         $('#page-info').text('صفحه ۰ از ۰ (تعداد کل: ۰)');
         $('.pagination-controls button').prop('disabled', true);
    }
});