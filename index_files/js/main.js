function anhThe_choseBackground(color)
{ 
    document.getElementById('anhThe_background').value = color;
    document.getElementById('anhThe_demo').style.backgroundColor = color;
    if (color == '#ffffff')
    {
        document.getElementById('anhThe_demo_background').innerText = 'Nền trắng';
    }
    else
    {
        document.getElementById('anhThe_demo_background').innerText = 'Nền xanh';
    }    
}


function anhThe_choseSize(size)
{ 
    document.getElementById('anhThe_size').value = size;
    if (size == '3,7 x 5,5 cm')
    {
        document.getElementById('anhThe_demo_size').innerText = '4 x 6cm';
        document.getElementById('anhThe_demo').style.height = "200px";
    }
    else
    {
        document.getElementById('anhThe_demo_size').innerText = '3 x 4cm';
        document.getElementById('anhThe_demo').style.height = "180px";
    }
}


function anhThe_choseAo(ao)
{
    document.getElementById('anhThe_ao').value = ao;
    if (ao == 'soMi')
    {
        document.getElementById('anhThe_demo_avatar').innerHTML = `
        Áo sơ mi<br>
        <img src="index_files/img/1.png" style="height: 100%;">`;
    }
    else
    {
        document.getElementById('anhThe_demo_avatar').innerHTML = `
        Áo dài<br>
        <img src="index_files/img/3.png" style="height: 100%;">`;
    }
}

function anhThe_copy()
{
    let bg = document.getElementById('anhThe_background').value;
    let size = document.getElementById('anhThe_size').value;
    let ao = document.getElementById('anhThe_ao').value == 'soMi' ? 'áo sơ mi trắng' : 'áo dài trắng';
    let yeuCauKhac = document.getElementById('anhThe_yeuCauKhac').value;
    let noiDung = `Hãy tạo ảnh thẻ từ ảnh gốc này. Yêu cầu quan trọng nhất: Giữ nguyên cấu trúc khuôn mặt (facial structure), đường nét xương hàm và tỷ lệ các ngũ quan (mắt, mũi, miệng) 100% từ ảnh gốc. KHÔNG làm thon gọn hay làm đầy khuôn mặt. Chỉ thực hiện các thay đổi sau:
1. Thay trang phục thành: ${ao}

2. Thay nền thành: mã màu (${bg})

3. Xử lý da nhẹ nhàng (giảm mụn, làm sáng da tự nhiên) nhưng phải giữ đúng khối mặt ban đầu.

4. nếu nữ thì làm môi hồng đỏ tươi, nếu nam thì không làm

5. Kích thước ảnh ${size}

6. Độ phân giải 300px/inch`;
    if (yeuCauKhac.length > 5) {
        noiDung += ` 
(Thêm yêu cầu khác: ${yeuCauKhac}. 

Nếu yêu cầu khác này mâu thuẫn với 1 trong các yêu cầu ở trên thì thực hiện theo yêu cầu này, không thực hiện yêu cầu mâu thuẫn trên đó)`;
    }

    document.getElementById('noiDungCopy').value = noiDung;
    copyToClipboard('noiDungCopy');
    window.open('https://gemini.google.com/', '_blank');
}


function copyToClipboard(noiDungId) 
{
    const input = document.getElementById(noiDungId);
    let noiDung = input.value;
    const brRegex = /<br\s*[\/]?>/gi;

    const text = noiDung.replace(brRegex, "\r\n");

    navigator.clipboard.writeText(text);    

    input.classList.add("Note_Input_Active");

    setTimeout(() => {
        input.classList.remove("Note_Input_Active");
    }, 100);
}