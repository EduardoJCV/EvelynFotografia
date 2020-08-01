function init(){
    firebase.database().ref('informacion').once('value').then( snap => {
        let result = snap.val();
        console.log(result);
        document.querySelector('#aboutMe-img').src= result.foto;
        // document.querySelector('#aboutMe-img-inp').value= result.foto;
    });
    firebase.database().ref('precios/paquetes').once('value').then( snap => {
        let result = snap.val();
        document.querySelector('#form-edit-packs').innerHTML=`
            <div class="image-upload">
                <label for="inp-img-pack">
                    <img id="inp-img-events" src="${result.events.img}" > 
                </label>
                <input id="inp-img-pack" type="file"  accept="image/*" />
            </div>
            <input id="inpt-time-pack" style="width: 100% !important;" class="input" type="text" placeholder="Tiempo" value="${result.events.time}">
            <input id="inpt-price-pack" style="width: 100% !important;" class="input" type="text" placeholder="Precio" value="${result.events.price}">
            <label for="descripcion">Descripcion: </label>
            <textarea id="inpt-info-pack" class="input" name="descripcion" cols="30" rows="10">${result.events.info}</textarea>
            <button id="btn-act-pack" class="input">Actualizar</button>
        `;
    });
    firebase.database().ref('portafolio').once('value').then( snap => {
        let result = snap.val();
        console.log(result);
        document.querySelector('#form-edit-works').innerHTML=`
        <article>
            <input id="inpt-title-work" style="width: 100% !important;" class="input"  type="text" placeholder="Titulo" value="${result[0].title}">
            <button id="btn-act-work" class="input">Actualizar</button>
        <section>
            <div class="grid">
                <div class="image-upload">
                    <label for="inp-img-pack1">
                        <div class="grid-item"><img src="${result[0].imgs[0]}"></div>
                    </label>
                    <input id="inp-img-pack1" type="file"  accept="image/*" />
                </div>
                <div class="image-upload">
                    <label for="inp-img-pack2">
                        <div class="grid-item"><img src="${result[0].imgs[1]}"></div>
                    </label>
                    <input id="inp-img-pack2" type="file"  accept="image/*" />
                </div>
                <div class="image-upload">
                    <label for="inp-img-pack3">
                        <div class="grid-item"><img src="${result[0].imgs[2]}"></div>
                    </label>
                    <input id="inp-img-pack3" type="file"  accept="image/*" />
                </div>
                <div class="image-upload">
                    <label for="inp-img-pack4">
                        <div class="grid-item"><img src="${result[0].imgs[3]}"></div>
                    </label>
                    <input id="inp-img-pack4" type="file"  accept="image/*" />
                </div>
                <div class="image-upload">
                    <label for="inp-img-pack5">
                        <div class="grid-item"><img src="${result[0].imgs[4]}"></div>
                    </label>
                    <input id="inp-img-pack5" type="file"  accept="image/*" />
                </div>
                <div class="image-upload">
                    <label for="inp-img-pack6">
                        <div class="grid-item"><img src="${result[0].imgs[5]}"></div>
                    </label>
                    <input id="inp-img-pack6" type="file"  accept="image/*" />
                </div>
            </div>
        </section>
        </article>
        `;
    });
    firebase.database().ref('mensajes').once('value').then( snap => {
        let result = snap.val();
        for (let i = 1; i <= result[0]; i++) {
            document.querySelector('#mensajes-cont').innerHTML+=`
            <div class="contenedor form">
                <a class="btn-eliminar">Eliminar Mensaje</a>
                <input disabled class="input" type="text" placeholder="Nombre" value="${result[i].nombre}">
                <input disabled class="input" type="text" placeholder="Email" value="${result[i].email}">
                <label for="descripcion">Mensaje: </label>
                <textarea disabled class="input" name="descripcion" cols="30" rows="10">${result[i].contenido}</textarea>
            </div>
            `;
        }
    });
    setTimeout(() => {

        

        document.querySelector('#aboutMe-img-inp').addEventListener('change',()=>{
            console.log(document.querySelector('#aboutMe-img-inp').files[0]);
            let storageRef = firebase.storage().ref();
            let putRef = storageRef.child('about/perfil.jpg');
            let delRef = storageRef.child('about/perfil.jpg');
            let file = document.querySelector('#aboutMe-img-inp').files[0];
            document.querySelector('#cargaContent').classList.remove('hide');
            delRef.delete().then(function() {
                console.log('eliminada correctamente');
                var uploadTask = storageRef.child('about/perfil.jpg').put(file);
                    uploadTask.on('state_changed', function(snapshot){
                        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        document.querySelector('#cargaValue').innerText ='Upload is ' + progress + '% done';
                        switch (snapshot.state) {
                            case firebase.storage.TaskState.PAUSED:
                                console.log('Upload is paused');
                            break;
                            case firebase.storage.TaskState.RUNNING:
                                console.log('Upload is running');
                            break;
                        }
                    }, function(error) {
                    }, function() {
                        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                            firebase.database().ref('informacion/foto').set(downloadURL);
                            document.querySelector('#cargaContent').classList.add('hide');
                        });
                    });
            }).catch(function(error) {
                console.log('error al eliminar foto');
                ocument.querySelector('#cargaContent').classList.remove('hide');
                putRef.put(file).then(function(snapshot) {
                    console.log('Uploaded a blob or file!');
                    ocument.querySelector('#cargaContent').classList.add('hide');
                });
            });
        });
        document.querySelector('#inp-img-pack').addEventListener('change',()=>{
            console.log(document.querySelector('#inp-img-pack').files[0]);
            let storageRef = firebase.storage().ref();
            let putRef = storageRef.child('services/events/imagen.jpg');
            let delRef = storageRef.child('services/events/imagen.jpg');
            let file = document.querySelector('#inp-img-pack').files[0];
            document.querySelector('#cargaContent').classList.remove('hide');
            delRef.delete().then(function() {
                console.log('eliminada correctamente');
                var uploadTask = storageRef.child('services/events/imagen.jpg').put(file);
                    uploadTask.on('state_changed', function(snapshot){
                        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        document.querySelector('#cargaValue').innerText ='Upload is ' + progress + '% done';
                        switch (snapshot.state) {
                            case firebase.storage.TaskState.PAUSED:
                                console.log('Upload is paused');
                            break;
                            case firebase.storage.TaskState.RUNNING:
                                console.log('Upload is running');
                            break;
                        }
                    }, function(error) {
                    }, function() {
                        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                            firebase.database().ref('precios/paquetes/events/img').set(downloadURL);
                            document.querySelector('#cargaContent').classList.add('hide');
                        });
                    });
            }).catch(function(error) {
                console.log('error al eliminar foto');
                ocument.querySelector('#cargaContent').classList.remove('hide');
                putRef.put(file).then(function(snapshot) {
                    console.log('Uploaded a blob or file!');
                    
                    ocument.querySelector('#cargaContent').classList.add('hide');
                });
            });
        });
        document.querySelector('#btn-act-pack').addEventListener('click',()=>{
            try{
                firebase.database().ref('precios/paquetes/events/time').set(document.querySelector('#inpt-time-pack').value);
                firebase.database().ref('precios/paquetes/events/price').set(document.querySelector('#inpt-price-pack').value);
                firebase.database().ref('precios/paquetes/events/info').set(document.querySelector('#inpt-info-pack').value);
                alert("Actualizado correctamente");
            }catch{
                alert("Error al actualizar");
            }
        });
        document.querySelector('#btn-act-work').addEventListener('click',()=>{
            try{
                firebase.database().ref('portafolio/0/title').set(document.querySelector('#inpt-title-work').value);
                alert("Actualizado correctamente");
            }catch{
                alert("Error al actualizar");
            }
        });
    }, 2000);
}

{/* <button id="btn-act-img" class="input">Actualizar</button> */}
document.querySelector('#btn-log').addEventListener('click',()=>{
    if ( document.querySelector('#inpt-log-usr').value != "" && document.querySelector('#inpt-log-clv').value != "" ) { //
        try{
            firebase.database().ref('4dm1n/'+document.querySelector('#inpt-log-usr').value).once('value').then( snap => { 
                let result = snap.val();
                if ( result && result.passw == document.querySelector('#inpt-log-clv').value) {
                    document.querySelector('#app').innerHTML=`
                    <div class="contenedor">
                    <h2 class="titulo">Cambiar foto de perfil</h2>
                    <div class="form">
                        <div class="image-upload">
                            <label for="aboutMe-img-inp">
                                <img id="aboutMe-img" src="https://scontent.fcuu2-1.fna.fbcdn.net/v/t1.0-9/103265939_3924328217609169_7353309481717892647_o.jpg?_nc_cat=101&_nc_sid=e3f864&_nc_ohc=cIvNGHz7wT4AX-m89YY&_nc_ht=scontent.fcuu2-1.fna&oh=b3743e9e1ccfebac3bd368ef93171114&oe=5F20B308" > 
                            </label>

                            <input id="aboutMe-img-inp" type="file"  accept="image/*" />
                        </div>
                    </div>
                    </div>
                    <div class="contenedor">
                        <h2 class="titulo">Cambiar Informacion De Los Paquetes</h2>
                        <div class="select-pack">
                            <p>
                                <label>
                                <input onclick="editPack('events')" class="with-gap" name="group1" type="radio" checked />
                                <span>Events</span>
                                </label>
                            </p>
                            <p>
                                <label>
                                <input onclick="editPack('familiar')" class="with-gap" name="group1" type="radio" />
                                <span>Familiar</span>
                                </label>
                            </p>
                            <p>
                                <label>
                                <input onclick="editPack('casual')" class="with-gap" name="group1" type="radio"  />
                                <span>Casual</span>
                                </label>
                            </p>
                            <p>
                                <label>
                                <input onclick="editPack('senior')" class="with-gap" name="group1" type="radio" />
                                <span>Senior</span>
                                </label>
                            </p>
                            <p>
                                <label>
                                <input onclick="editPack('special')" class="with-gap" name="group1" type="radio" />
                                <span>Special</span>
                                </label>
                            </p>
                            <p>
                                <label>
                                <input onclick="editPack('promotion')" class="with-gap" name="group1" type="radio" />
                                <span>Promotion</span>
                                </label>
                            </p>
                        </div>
                        <p>.<hr>.</p>
                        <div id="form-edit-packs" class="form">
                        </div>
                    </div>
                    <div class="contenedor">
                        <h2 class="titulo">Actualizar Portafolio</h2>
                        <div class="select-pack">
                            <p>
                                <label>
                                <input onclick="editWork('0')" class="with-gap" name="group2" type="radio" checked />
                                <span>Work 1</span>
                                </label>
                            </p>
                            <p>
                                <label>
                                <input onclick="editWork('1')" class="with-gap" name="group2" type="radio" />
                                <span>Work 2</span>
                                </label>
                            </p>
                            <p>
                                <label>
                                <input onclick="editWork('2')" class="with-gap" name="group2" type="radio"  />
                                <span>Work 3</span>
                                </label>
                            </p>
                            <p>
                                <label>
                                <input onclick="editWork('3')" class="with-gap" name="group2" type="radio" />
                                <span>Work 4</span>
                                </label>
                            </p>
                        </div>
                        <p>.<hr>.</p>
                        <div id="form-edit-works" class="form">
                        </div>
                    </div>
                    <div class="contenedor">
                        <h2 class="titulo">Mensajes Recibidos</h2>
                        <div id="mensajes-cont" class="contenedor">
                        </div>
                    </div>
                    `;
                    setTimeout(() => {
                        init();
                    }, 1500);
                    // alert('Sesion iniciada correctamente');
                } else{
                    alert('error al iniciar sesion datos invalidos');
                }
            });
        }catch{
            alert('error al iniciar sesion datos invalidos');
        }
    }else{
        alert('error al iniciar sesion datos invalidos');
    }
});

function editPack(paquete){
    firebase.database().ref('precios/paquetes/'+paquete).once('value').then( snap => {
        let result = snap.val();
        document.querySelector('#form-edit-packs').innerHTML=`
        <div class="image-upload">
            <label for="inp-img-pack">
                <img id="inp-img-${paquete}" src="${result.img}" > 
            </label>
            <input id="inp-img-pack" type="file"  accept="image/*" />
        </div>
        <input id="inpt-time-pack" style="width: 100% !important;" class="input" type="text" placeholder="Tiempo" value="${result.time}">
            <input id="inpt-price-pack" style="width: 100% !important;" class="input" type="text" placeholder="Precio" value="${result.price}">
            <label for="descripcion">Descripcion: </label>
            <textarea id="inpt-info-pack" class="input" name="descripcion" cols="30" rows="10">${result.info}</textarea>
            <button id="btn-act-pack" class="input">Actualizar</button>
        `;
    });
    setTimeout(() => {
        document.querySelector('#inp-img-pack').addEventListener('change',()=>{
            console.log(document.querySelector('#inp-img-pack').files[0]);
            let storageRef = firebase.storage().ref();
            let putRef = storageRef.child('services/'+paquete+'/imagen.jpg');
            let delRef = storageRef.child('services/'+paquete+'/imagen.jpg');
            let file = document.querySelector('#inp-img-pack').files[0];
            document.querySelector('#cargaContent').classList.remove('hide');
            delRef.delete().then(function() {
                console.log('eliminada correctamente');
                var uploadTask = storageRef.child('services/'+paquete+'/imagen.jpg').put(file);
                    uploadTask.on('state_changed', function(snapshot){
                        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        document.querySelector('#cargaValue').innerText ='Upload is ' + progress + '% done';
                        switch (snapshot.state) {
                            case firebase.storage.TaskState.PAUSED:
                                console.log('Upload is paused');
                            break;
                            case firebase.storage.TaskState.RUNNING:
                                console.log('Upload is running');
                            break;
                        }
                    }, function(error) {
                    }, function() {
                        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                            firebase.database().ref('precios/paquetes/'+paquete+'/img').set(downloadURL);
                            document.querySelector('#cargaContent').classList.add('hide');
                        });
                    });
            }).catch(function(error) {
                console.log('error al eliminar foto');
                ocument.querySelector('#cargaContent').classList.remove('hide');
                putRef.put(file).then(function(snapshot) {
                    console.log('Uploaded a blob or file!');
                    ocument.querySelector('#cargaContent').classList.add('hide');
                });
            });
        });
        document.querySelector('#btn-act-pack').addEventListener('click',()=>{
            try{
                firebase.database().ref('precios/paquetes/'+paquete+'/time').set(document.querySelector('#inpt-time-pack').value);
                firebase.database().ref('precios/paquetes/'+paquete+'/price').set(document.querySelector('#inpt-price-pack').value);
                firebase.database().ref('precios/paquetes/'+paquete+'/info').set(document.querySelector('#inpt-info-pack').value);
                alert("Actualizado correctamente");
            }catch{
                alert("Error al actualizar");
            }
        });
    }, 2000);
}
function editWork(work){
    firebase.database().ref('portafolio/'+work).once('value').then( snap => {
        let result = snap.val();
        console.log(result);
        document.querySelector('#form-edit-works').innerHTML=`
        <article>
        <input id="inpt-title-work" style="width: 100% !important;" class="input"  type="text" placeholder="Titulo" value="${result.title}">
        <button id="btn-act-work" class="input">Actualizar</button>
    <section>
        <div class="grid">
            <div class="image-upload">
                <label for="inp-img-pack1">
                    <div class="grid-item"><img id="img-pack1" src="${result.imgs[0]}"></div>
                </label>
                <input id="inp-img-pack1" type="file"  accept="image/*" />
            </div>
            <div class="image-upload">
                <label for="inp-img-pack2">
                    <div class="grid-item"><img id="img-pack2" src="${result.imgs[1]}"></div>
                </label>
                <input id="inp-img-pack2" type="file"  accept="image/*" />
            </div>
            <div class="image-upload">
                <label for="inp-img-pack3">
                    <div class="grid-item"><img id="img-pack3" src="${result.imgs[2]}"></div>
                </label>
                <input id="inp-img-pack3" type="file"  accept="image/*" />
            </div>
            <div class="image-upload">
                <label for="inp-img-pack4">
                    <div class="grid-item"><img id="img-pack4" src="${result.imgs[3]}"></div>
                </label>
                <input id="inp-img-pack4" type="file"  accept="image/*" />
            </div>
            <div class="image-upload">
                <label for="inp-img-pack5">
                    <div class="grid-item"><img id="img-pack5" src="${result.imgs[4]}"></div>
                </label>
                <input id="inp-img-pack5" type="file"  accept="image/*" />
            </div>
            <div class="image-upload">
                <label for="inp-img-pack6">
                    <div class="grid-item"><img id="img-pack6" src="${result.imgs[5]}"></div>
                </label>
                <input id="inp-img-pack6" type="file"  accept="image/*" />
            </div>
        </div>
    </section>
    </article>
        `;
    });
    setTimeout(() => {
        document.querySelector('#btn-act-work').addEventListener('click',()=>{
            try{
                firebase.database().ref('portafolio/'+work+'title').set(document.querySelector('#inpt-title-work').value);
                alert("Actualizado correctamente");
            }catch{
                alert("Error al actualizar");
            }
        });
        document.querySelector('#inp-img-pack1').addEventListener('change',()=>{
            console.log('works/work'+(parseInt(work)+1)+'/uno.jpg');
            console.log(document.querySelector('#inp-img-pack1').files[0]);
            let storageRef = firebase.storage().ref();
            let putRef = storageRef.child('works/work'+(parseInt(work)+1)+'/uno.jpg');
            let delRef = storageRef.child('works/work'+(parseInt(work)+1)+'/uno.jpg');
            let file = document.querySelector('#inp-img-pack1').files[0];
            document.querySelector('#cargaContent').classList.remove('hide');
            delRef.delete().then(function() {
                console.log('eliminada correctamente');
                var uploadTask = storageRef.child('works/work'+(parseInt(work)+1)+'/uno.jpg').put(file);
                    uploadTask.on('state_changed', function(snapshot){
                        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        document.querySelector('#cargaValue').innerText ='Upload is ' + progress + '% done';
                        switch (snapshot.state) {
                            case firebase.storage.TaskState.PAUSED:
                                console.log('Upload is paused');
                            break;
                            case firebase.storage.TaskState.RUNNING:
                                console.log('Upload is running');
                            break;
                        }
                    }, function(error) {
                    }, function() {
                        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                            firebase.database().ref('portafolio/'+work+'/imgs/0').set(downloadURL);
                            document.querySelector('#img-pack1').src = URL.createObjectURL(file);
                            document.querySelector('#cargaContent').classList.add('hide');
                        });
                    });
            }).catch(function(error) {
                console.log('error al eliminar foto');
                ocument.querySelector('#cargaContent').classList.remove('hide');
                putRef.put(file).then(function(snapshot) {
                    console.log('Uploaded a blob or file!');
                    ocument.querySelector('#cargaContent').classList.add('hide');
                });
            });
        });
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        document.querySelector('#inp-img-pack2').addEventListener('change',()=>{
            console.log('works/work'+(parseInt(work)+1)+'/dos.jpg');
            console.log(document.querySelector('#inp-img-pack2').files[0]);
            let storageRef = firebase.storage().ref();
            let putRef = storageRef.child('works/work'+(parseInt(work)+1)+'/dos.jpg');
            let delRef = storageRef.child('works/work'+(parseInt(work)+1)+'/dos.jpg');
            let file = document.querySelector('#inp-img-pack2').files[0];
            document.querySelector('#cargaContent').classList.remove('hide');
            delRef.delete().then(function() {
                console.log('eliminada correctamente');
                var uploadTask = storageRef.child('works/work'+(parseInt(work)+1)+'/dos.jpg').put(file);
                    uploadTask.on('state_changed', function(snapshot){
                        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        document.querySelector('#cargaValue').innerText ='Upload is ' + progress + '% done';
                        switch (snapshot.state) {
                            case firebase.storage.TaskState.PAUSED:
                                console.log('Upload is paused');
                            break;
                            case firebase.storage.TaskState.RUNNING:
                                console.log('Upload is running');
                            break;
                        }
                    }, function(error) {
                    }, function() {
                        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                            firebase.database().ref('portafolio/'+work+'/imgs/1').set(downloadURL);
                            document.querySelector('#img-pack2').src = URL.createObjectURL(file);
                            document.querySelector('#cargaContent').classList.add('hide');
                        });
                    });
            }).catch(function(error) {
                console.log('error al eliminar foto');
                ocument.querySelector('#cargaContent').classList.remove('hide');
                putRef.put(file).then(function(snapshot) {
                    console.log('Uploaded a blob or file!');
                    ocument.querySelector('#cargaContent').classList.add('hide');
                });
            });
        });
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        document.querySelector('#inp-img-pack3').addEventListener('change',()=>{
            console.log('works/work'+(parseInt(work)+1)+'/tres.jpg');
            console.log(document.querySelector('#inp-img-pack3').files[0]);
            let storageRef = firebase.storage().ref();
            let putRef = storageRef.child('works/work'+(parseInt(work)+1)+'/tres.jpg');
            let delRef = storageRef.child('works/work'+(parseInt(work)+1)+'/tres.jpg');
            let file = document.querySelector('#inp-img-pack3').files[0];
            document.querySelector('#cargaContent').classList.remove('hide');
            delRef.delete().then(function() {
                console.log('eliminada correctamente');
                var uploadTask = storageRef.child('works/work'+(parseInt(work)+1)+'/tres.jpg').put(file);
                    uploadTask.on('state_changed', function(snapshot){
                        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        document.querySelector('#cargaValue').innerText ='Upload is ' + progress + '% done';
                        switch (snapshot.state) {
                            case firebase.storage.TaskState.PAUSED:
                                console.log('Upload is paused');
                            break;
                            case firebase.storage.TaskState.RUNNING:
                                console.log('Upload is running');
                            break;
                        }
                    }, function(error) {
                    }, function() {
                        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                            firebase.database().ref('portafolio/'+work+'/imgs/2').set(downloadURL);
                            document.querySelector('#img-pack3').src = URL.createObjectURL(file);
                            document.querySelector('#cargaContent').classList.add('hide');
                        });
                    });
            }).catch(function(error) {
                console.log('error al eliminar foto');
                ocument.querySelector('#cargaContent').classList.remove('hide');
                putRef.put(file).then(function(snapshot) {
                    console.log('Uploaded a blob or file!');
                    ocument.querySelector('#cargaContent').classList.add('hide');
                });
            });
        });
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        document.querySelector('#inp-img-pack4').addEventListener('change',()=>{
            console.log('works/work'+(parseInt(work)+1)+'/cuatro.jpg');
            console.log(document.querySelector('#inp-img-pack4').files[0]);
            let storageRef = firebase.storage().ref();
            let putRef = storageRef.child('works/work'+(parseInt(work)+1)+'/cuatro.jpg');
            let delRef = storageRef.child('works/work'+(parseInt(work)+1)+'/cuatro.jpg');
            let file = document.querySelector('#inp-img-pack4').files[0];
            document.querySelector('#cargaContent').classList.remove('hide');
            delRef.delete().then(function() {
                console.log('eliminada correctamente');
                var uploadTask = storageRef.child('works/work'+(parseInt(work)+1)+'/cuatro.jpg').put(file);
                    uploadTask.on('state_changed', function(snapshot){
                        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        document.querySelector('#cargaValue').innerText ='Upload is ' + progress + '% done';
                        switch (snapshot.state) {
                            case firebase.storage.TaskState.PAUSED:
                                console.log('Upload is paused');
                            break;
                            case firebase.storage.TaskState.RUNNING:
                                console.log('Upload is running');
                            break;
                        }
                    }, function(error) {
                    }, function() {
                        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                            firebase.database().ref('portafolio/'+work+'/imgs/3').set(downloadURL);
                            document.querySelector('#img-pack4').src = URL.createObjectURL(file);
                            document.querySelector('#cargaContent').classList.add('hide');
                        });
                    });
            }).catch(function(error) {
                console.log('error al eliminar foto');
                ocument.querySelector('#cargaContent').classList.remove('hide');
                putRef.put(file).then(function(snapshot) {
                    console.log('Uploaded a blob or file!');
                    ocument.querySelector('#cargaContent').classList.add('hide');
                });
            });
        });
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        document.querySelector('#inp-img-pack5').addEventListener('change',()=>{
            console.log('works/work'+(parseInt(work)+1)+'/cinco.jpg');
            console.log(document.querySelector('#inp-img-pack5').files[0]);
            let storageRef = firebase.storage().ref();
            let putRef = storageRef.child('works/work'+(parseInt(work)+1)+'/cinco.jpg');
            let delRef = storageRef.child('works/work'+(parseInt(work)+1)+'/cinco.jpg');
            let file = document.querySelector('#inp-img-pack5').files[0];
            document.querySelector('#cargaContent').classList.remove('hide');
            delRef.delete().then(function() {
                console.log('eliminada correctamente');
                var uploadTask = storageRef.child('works/work'+(parseInt(work)+1)+'/cinco.jpg').put(file);
                    uploadTask.on('state_changed', function(snapshot){
                        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        document.querySelector('#cargaValue').innerText ='Upload is ' + progress + '% done';
                        switch (snapshot.state) {
                            case firebase.storage.TaskState.PAUSED:
                                console.log('Upload is paused');
                            break;
                            case firebase.storage.TaskState.RUNNING:
                                console.log('Upload is running');
                            break;
                        }
                    }, function(error) {
                    }, function() {
                        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                            firebase.database().ref('portafolio/'+work+'/imgs/4').set(downloadURL);
                            document.querySelector('#img-pack5').src = URL.createObjectURL(file);
                            document.querySelector('#cargaContent').classList.add('hide');
                        });
                    });
            }).catch(function(error) {
                console.log('error al eliminar foto');
                ocument.querySelector('#cargaContent').classList.remove('hide');
                putRef.put(file).then(function(snapshot) {
                    console.log('Uploaded a blob or file!');
                    ocument.querySelector('#cargaContent').classList.add('hide');
                });
            });
        });
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        document.querySelector('#inp-img-pack6').addEventListener('change',()=>{
            console.log('works/work'+(parseInt(work)+1)+'/seis.jpg');
            console.log(document.querySelector('#inp-img-pack6').files[0]);
            let storageRef = firebase.storage().ref();
            let putRef = storageRef.child('works/work'+(parseInt(work)+1)+'/seis.jpg');
            let delRef = storageRef.child('works/work'+(parseInt(work)+1)+'/seis.jpg');
            let file = document.querySelector('#inp-img-pack6').files[0];
            document.querySelector('#cargaContent').classList.remove('hide');
            delRef.delete().then(function() {
                console.log('eliminada correctamente');
                var uploadTask = storageRef.child('works/work'+(parseInt(work)+1)+'/seis.jpg').put(file);
                    uploadTask.on('state_changed', function(snapshot){
                        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        document.querySelector('#cargaValue').innerText ='Upload is ' + progress + '% done';
                        switch (snapshot.state) {
                            case firebase.storage.TaskState.PAUSED:
                                console.log('Upload is paused');
                            break;
                            case firebase.storage.TaskState.RUNNING:
                                console.log('Upload is running');
                            break;
                        }
                    }, function(error) {
                    }, function() {
                        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                            firebase.database().ref('portafolio/'+work+'/imgs/6').set(downloadURL);
                            document.querySelector('#img-pack6').src = URL.createObjectURL(file);
                            document.querySelector('#cargaContent').classList.add('hide');
                        });
                    });
            }).catch(function(error) {
                console.log('error al eliminar foto');
                ocument.querySelector('#cargaContent').classList.remove('hide');
                putRef.put(file).then(function(snapshot) {
                    console.log('Uploaded a blob or file!');
                    ocument.querySelector('#cargaContent').classList.add('hide');
                });
            });
        });
    }, 2000);
}