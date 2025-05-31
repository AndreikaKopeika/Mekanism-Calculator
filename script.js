document.addEventListener('DOMContentLoaded', () => {
    const brinePriceInput = document.getElementById('brinePrice');
    const energyPriceInput = document.getElementById('energyPrice');
    const calculateButton = document.getElementById('calculateButton');
    const resultDisplay = document.getElementById('resultDisplay');

    // --- Константы Mekanism ---
    // Для 1 ведра (1000mB) HCl:
    // 1. Рассол -> Электролитический сепаратор -> 1000mB Хлора + 1000mB Натрия. Энергия: 400 kJ (0.4 MJ)
    // 2. Вода -> Электролитический сепаратор -> 1000mB Водорода + 500mB Кислорода. Энергия: 400 kJ (0.4 MJ)
    // 3. 1000mB Водорода + 1000mB Хлора -> Химический Инфузор -> 1000mB HCl. Энергия: 4000 kJ (4.0 MJ)
    // Итого энергии на 1 ведро HCl: 0.4 + 0.4 + 4.0 = 4.8 MJ

    const ENERGY_PER_BUCKET_HCL_MJ = 4.8; // Мегаджоулей на 1 ведро HCl
    const BRINE_BUCKETS_FOR_PRICE = 128; // Цена указана за это количество вёдер рассола

    calculateButton.addEventListener('click', () => {
        const brineStackPrice = parseFloat(brinePriceInput.value); // Цена за 128 вёдер рассола
        const energyPerMjPrice = parseFloat(energyPriceInput.value); // Цена за 1 MJ

        if (isNaN(brineStackPrice) || brineStackPrice < 0 || isNaN(energyPerMjPrice) || energyPerMjPrice < 0) {
            resultDisplay.innerHTML = `<p style="color: #FF5555;">Ошибка: Введите корректные числовые значения (больше или равные нулю).</p>`;
            return;
        }

        // 1. Стоимость одного ведра рассола
        const pricePerBucketBrine = brineStackPrice / BRINE_BUCKETS_FOR_PRICE;

        // 2. Стоимость рассола для 1 ведра HCl (нужно 1 ведро рассола)
        const brineCostForHCl = pricePerBucketBrine;

        // 3. Стоимость энергии для 1 ведра HCl
        const energyCostForHCl = ENERGY_PER_BUCKET_HCL_MJ * energyPerMjPrice;
        
        // 4. Общая стоимость 1 ведра HCl
        const totalCostPerBucketHCl = brineCostForHCl + energyCostForHCl;

        resultDisplay.innerHTML = `
            <p><strong>Стоимость 1 ведра Хлороводорода (HCl):</strong></p>
            <p>Из Рассола: <strong style="color:#ADD8E6;">${brineCostForHCl.toFixed(4)}</strong> алмазов</p>
            <p>Из Энергии: <strong style="color:#FFFF00;">${energyCostForHCl.toFixed(4)}</strong> алмазов</p>
            <hr style="border-color: #5C5C5C; margin: 5px 0;">
            <p><strong>Итого: <span style="color:#00FF00; font-size: 1.2em;">${totalCostPerBucketHCl.toFixed(4)}</span> алмазов за ведро HCl</strong></p>
        `;
    });

    // Установить значения по умолчанию при загрузке для примера
    brinePriceInput.value = "10"; // Например, 10 алмазов за 128 вёдер
    energyPriceInput.value = "0.01"; // Например, 0.01 алмаза за 1 MJ
});
