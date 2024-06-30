document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('barcodeForm').addEventListener('submit', function(e) {
        e.preventDefault();  // 阻止表單默認提交
        const text = document.getElementById('barcodeInput').value.trim();  // 獲取用戶輸入並去除首尾空格
        const validCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-. *$/+%";

        for (let i=0;i<text.length;i++){
            if(!validCharacters.includes(text[i])){
                alert("輸入含有非法字元");
                document.getElementById('barcodeInput').value = "";
                return false;
            }
        }

        if (text.length != 8){
            alert("輸入的條碼長度不符");
            document.getElementById('barcodeInput').value = "";
            return false;
        }

        else if (text[0] != '/'){
            alert("請以 / 開頭");
            document.getElementById('barcodeInput').value = "";
            return false;
        }
        

        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        const image = new Image();
        image.src = './res/wan_resize.png';  // 這裡是你圖片的路徑

        image.onload = function() {
            // 清空 canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // 繪製背景圖片
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

            // 創建條碼畫布
            const barcodeCanvas = document.createElement('canvas');
            JsBarcode(barcodeCanvas, text, {
                format: "CODE39",
                lineColor: "#953636d9",
                width: 2,
                height: 80,
                displayValue: false,
                background : "rgba(255,255,255,0)"

            });

            // 將條碼繪製到主畫布上
            const barcodeImage = new Image();
            barcodeImage.src = barcodeCanvas.toDataURL();
            barcodeImage.onload = function() {
                // const barcodeX = canvas.width - barcodeCanvas.width - 10;  // 條碼 X 坐標
                // const barcodeY = canvas.height - barcodeCanvas.height - 10; // 條碼 Y 坐標
                const barcodeX = canvas.width / 10 + 25;  // 條碼 X 坐標
                const barcodeY = canvas.height *2/3 ; // 條碼 Y 坐標
                ctx.drawImage(barcodeImage, barcodeX, barcodeY);

                document.getElementById('downloadBtn').style.display = 'block';
            
            };
        };
    });

    //download
    document.getElementById("downloadBtn").addEventListener('click', function(){
        const canvas = document.getElementById('canvas');
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        const text = document.getElementById('barcodeInput').value.trim();
        const filename = "wanwan_QRcode" + text + ".png";
        link.download = (filename);
        link.click();
    });
    
});
