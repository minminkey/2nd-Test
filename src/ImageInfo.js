class ImageInfo {
    $imageInfo = null;
    data = null;
  
    constructor({ $target, data }) {
      const $imageInfo = document.createElement("div");
      $imageInfo.className = "ImageInfo";
      this.$imageInfo = $imageInfo;
      $target.appendChild($imageInfo);
  
      this.data = data;
      this.render();
    }
  
    setState(nextData) {
      this.data = nextData;
      this.render();
    }

    onClose(){
      console.log("click");
      // this.data.visible = !this.data.visible;
      this.data = null;
      this.$imageInfo.innerHTML = '';
      this.$imageInfo.style.display = "none";
    }
  
    render() {
      if (this.data.visible) {
        const { name, url, temperament, origin } = this.data.image;
        // console.log(this.data.breeds[0]);

        const overlay = document.createElement('div');
        overlay.className = 'overlay';

        const contentWrapper = document.createElement('section');
        contentWrapper.className = 'content-wrapper';

        const modalHeader = document.createElement('header');
        modalHeader.className = 'modal-header';
        
        const modalInfo = document.createElement('article');
        modalInfo.className = 'description';

        const modalTitle = document.createElement('p');
        modalHeader.className = 'title';
        modalHeader.innerText = name;

        const closeBtn = document.createElement('span');
        closeBtn.className = 'close';
        closeBtn.innerText = 'X';

        const modalImag = document.createElement('img');
        modalImag.className = 'modal-img';
        modalImag.src = url;

        const catOrigin = document.createElement('p');
        catOrigin.className = 'catOrigin';
        catOrigin.innerText = `태생 : ${origin}`;

        const catTemp = document.createElement('p');
        catTemp.className = 'capTemp';
        catTemp.innerText = `성격 : ${temperament}`;

        closeBtn.addEventListener('click', ()=>{this.onClose();});
        overlay.addEventListener('click', ()=>{this.onClose();});

        modalHeader.appendChild(modalTitle);
        modalHeader.appendChild(closeBtn);

        modalInfo.appendChild(catTemp);
        modalInfo.appendChild(catOrigin);

        contentWrapper.appendChild(modalHeader);
        contentWrapper.appendChild(modalImag);
        contentWrapper.appendChild(modalInfo);

        this.$imageInfo.appendChild(overlay);
        this.$imageInfo.appendChild(contentWrapper);

        // this.$imageInfo.innerHTML = `
        //   <article class="content-wrapper">
        //     <div class="title">
        //       <span>${name}</span>
        //       <div class="close">x</div>
        //     </div>
        //     <img src="${url}" alt="${name}"/>        
        //     <div class="description">
        //       <div>성격: ${temperament}</div>
        //       <div>태생: ${origin}</div>
        //     </div>
        //   </article>`;
        this.$imageInfo.style.display = "block";
      } else {
        this.$imageInfo.style.display = "none";
      }
      const closeBtn = document.querySelector('.close');
      console.log(closeBtn);
      // closeBtn.addEventListener('click', onClose());
      console.log(closeBtn);
    }
  }
  