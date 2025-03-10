
const loadPhone = async (searchText='f',isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones,isShowAll)

}



const displayPhones = (phones,isShowAll) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';

    const showAllContainerBtn = document.getElementById('showAllContainer');
    if (phones.length > 9 && !isShowAll) {
        showAllContainerBtn.classList.remove('hidden')
    }
    else {
        showAllContainerBtn.classList.add('hidden')
    }

    if(!isShowAll){
        phones = phones.slice(0, 9)
    }


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
                <button onclick="handleShowDetail('${phone.slug}') " class="text-white  font-bold bg-[#0D6EFD] px-4 py-2 rounded-lg cursor-pointer">Show Details</button>
            </div>
        </div>`;
        phoneContainer.appendChild(phoneCard)
    });
    toggleLoadingSpinner(false)
}

const handleShowDetail =async(id)=>{
    const res = await fetch(` https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    phoneShowDetails(phone)
}

const phoneShowDetails = (phone)=>{
    const showDetailsContainer= document.getElementById('show-details-container');
    showDetailsContainer.innerHTML=`
    <div class="bg-white p-6 rounded-lg shadow-lg w-96">
            <div class="flex justify-center">
                <img src="${phone.image}" alt="Product Image" class="rounded-lg">
            </div>
            <h2 class="text-xl font-semibold mt-4">${phone.name
            }</h2>
            <p class="text-gray-500 text-sm mt-1">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>

            <div class="mt-4 space-y-2">
                <p><strong>Storage:</strong>${phone?.mainFeatures?.storage
                }</p>
                <p><strong>Display Size:</strong>${phone?.mainFeatures?.displaySize
                } </p>
                <p><strong>Chipset:</strong> ${phone?.mainFeatures?.chipSet
                }</p>
                <p><strong>Memory:</strong>  ${phone?.mainFeatures?.memory
                }</p>
                <p><strong>Slug:</strong> ${phone?.slug
                } </p>
                <p><strong>Release Date:</strong>${phone?.releaseDate}</p>
                <p><strong>Brand:</strong> ${phone?.brand}</p>
                <p><strong>GPS:</strong> ${phone?.others?.GPS
                }</p>
            </div>

            <!-- Close Button -->
            <div class="modal-action">
                <form method="dialog">
                    <button class="btn">Close</button>
                </form>
            </div>
    </div>
    
    `
    show_details_modal.showModal()
}

const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true)
    const searchFiled = document.getElementById('search-filed');
    const searchText = searchFiled.value;
    loadPhone(searchText,isShowAll)
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


const handleShowAll = ()=>{
    handleSearch(true)
}

loadPhone()