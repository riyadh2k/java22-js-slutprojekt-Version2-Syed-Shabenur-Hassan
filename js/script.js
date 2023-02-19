const imageContainer = document.querySelector('.imageContainer');

document.querySelector('button').addEventListener('click', getPhotosInfo);

// Gets user input to GetPictures or if field is empty ,it will gives an alert
function getPhotosInfo(event) {
    event.preventDefault();

    const textInput = document.querySelector('.nameInput').value;
    const numberInput = document.querySelector('.numberInput').value;


    if (textInput != '' && numberInput != '' && numberInput > 0) {
        imageContainer.innerHTML = '';
        getPhotoImages(textInput, numberInput);
    } else {
        alert('Name of Photos and Number cannot be Empty. Number should be above 0');
    }
}

// Download Data from flickr and if anything goes wrong it will display error
function getPhotoImages(nameInput, numberInput, sortImages) {
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=9ee80ef9e0c728929d3fd608f5f3cad1&tags=${nameInput}&sort=${sortImages}&per_page=${numberInput}&format=json&nojsoncallback=1`;

    //console.log(url);

    fetch(url)
        .then(response => {
            //console.log(url);
            if (response.status >= 200 && response.status < 300) {

                return response.json();
            } else {
                throw "Fetch error";
            }
        })
        .then(displayPhotoImages)
        .catch(error => {
            //console.log(error);

            const errorMessage = document.createElement('h1');
            errorMessage.style.textAlign = 'center';
            imageContainer.append(errorMessage);
            errorMessage.innerText = 'Network Or Server Error !!!';
        });
}

// For each query get its necessary data and display the Image. And If no image is available then it will display no result
function displayPhotoImages(photoInfo) {
    const sizeInput = document.querySelector('.picSize').value;
    //console.log(sizeInput);
    //console.log(photoInfo);

    if (photoInfo && photoInfo.photos && photoInfo.photos.photo && photoInfo.photos.photo.length > 0)

        photoInfo.photos.photo.forEach(imgUrl => {

            const imageLink = `https://live.staticflickr.com/${imgUrl.server}/${imgUrl.id}_${imgUrl.secret}_${sizeInput}.jpg;`;

            const blankLink = document.createElement('a');
            const img = document.createElement('img');
            imageContainer.append(blankLink);
            blankLink.append(img);
            img.src = imageLink;
            blankLink.href = imageLink;
            blankLink.target = '_blank';
        });

    else {
        imageContainer.innerHTML = '';
        const errorMessage = document.createElement('h1');
        errorMessage.style.textAlign = 'center';
        imageContainer.append(errorMessage);
        errorMessage.innerText = '!!! No search result Found';

    }
}
