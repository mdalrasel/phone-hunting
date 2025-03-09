
const loadPhone = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones)

}


const displayPhones = phones => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';

    const showAllContainerBtn = document.getElementById('showAllContainer');
    if (phones.length > 9) {
        showAllContainerBtn.classList.remove('hidden')
    }
    else {
        showAllContainerBtn.classList.add('hidden')
    }

    phones = phones.slice(0, 9)


    phones.forEach(phone => {
        console.log(phone);
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-base-100 w-96 shadow-sm`;
        phoneCard.innerHTML = `
        <figure class="px-10 pt-10">
            <img src="${phone.image}" alt="Phone" class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
            <p class="font-bold text-2xl">$999</p>
            <div class="card-actions">
                <button class="text-white  font-bold bg-[#0D6EFD] px-4 py-2 rounded-lg cursor-pointer">Show Details</button>
            </div>
        </div>`;
        phoneContainer.appendChild(phoneCard)
    });
    toggleLoadingSpinner(false)
}

const handleSearch = () => {
    toggleLoadingSpinner(true)
    const searchFiled = document.getElementById('search-filed');
    const searchText = searchFiled.value;
    loadPhone(searchText)
}

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden')
    }
    else {
        loadingSpinner.classList.add('hidden')
    }
}
