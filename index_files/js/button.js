class MenuButton
{
    constructor (pannelStt , id, link,text,imageSrc,imageWidth)
    {
        this.pannelStt = pannelStt;
        this.id = id;
        this.link = link;
        this.text = text;
        this.imageSrc = imageSrc;
        this.imageWidth = imageWidth;
    }

    toElement(big = false)
    {
        let aa = document.createElement('a');
        aa.href = this.link;
        let divv = document.createElement('div');
        divv.className = 'appButton';
        if (big){divv.classList.add("bigButton");}
        if (this.imageSrc == '')
        {

        }
        else
        {
            let img = document.createElement('img');
            img.src = 'index_files/img/' + this.imageSrc;
            if (this.imageWidth !== '')
            {
                img.style.width = this.imageWidth;
            }
            divv.appendChild(img);
        }
        divv.appendChild(document.createTextNode(this.text));
        aa.appendChild(divv);

        aa.addEventListener('click', (e) => {
            e.preventDefault(); // chặn nhảy link ngay
            this.increaseCount();
            // mở link trong tab mới sau khi lưu
            window.open(this.link, '_blank');
        });

        return aa;
    }
    
    increaseCount()
    {        
        let countKey = 'pvcMenuClick_count';
        let countMap = JSON.parse(localStorage.getItem(countKey))  || {};
        countMap[this.id] = (countMap[this.id] || 0) + 1;
        localStorage.setItem(countKey, JSON.stringify(countMap));
        renderFavoriteButtons();
    }
}

function renderFavoriteButtons()
{
    favoriteMenu = document.getElementById('favoriteMenu');
    let countKey = 'pvcMenuClick_count';
    let countMap = JSON.parse(localStorage.getItem(countKey)) || {};
    
    // Chuyển object thành mảng [id, count] và sắp xếp theo count giảm dần
    const sortedEntries = Object.entries(countMap).sort((a, b) => b[1] - a[1]);

    // Lấy 6 phần tử đầu tiên
    const top6 = sortedEntries.slice(0, 6);
    // Log ra 6 key có value lớn nhất
    console.log('Top 6 keys with highest values:', top6.map(([id, count]) => id));

    favoriteMenu.innerHTML = ''; // Xóa hết button cũ

    // Render button mới theo thứ tự top 6
    top6.forEach(([id, count]) => {
        const menuItem = DSButton.find(item => item.id === id);
        if (menuItem) {
            const btn = new MenuButton(menuItem.pannelStt, menuItem.id, menuItem.link, menuItem.text, menuItem.imageSrc, menuItem.imageWidth);
            favoriteMenu.appendChild(btn.toElement());
        }
    });
}
