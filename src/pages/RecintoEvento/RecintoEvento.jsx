import React, { useEffect, useState } from "react";
import Tlf from "../../assets/tlf.png";
import { useDispatch } from "react-redux";

import { HiMagnifyingGlass, HiOutlineTrash } from "react-icons/hi2";

import BtnSave from "../../components/Buttons/BtnSave";
import BtnPublish from "../../components/Buttons/BtnPublish";
import BtnRevision from "../../components/Buttons/BtnRevision";

import "./RecintoEvento.scss";
import { createRecinto } from "../../features/recinto/recintoSlice";

function RecintoEvento() {
  // Estado que recoge todos los inputs del recinto
  const [formData, setFormData] = useState({
    aforo: '',
    accesos: '',
    discapacitados: 'true',
    plantas: '',
    ascensor: 'true',
    aseos: '',
    wifi: 'true',
    parking: 'true',
    transporte: 'true',
    emergencia: '',
    restauracion: 'true',
    exterior: 'true',
    interior: 'true',
    privadas: 'true',
  }); 
 // Estados que recogen la imagen del mapa del recinto y la guarda
 const [imageName, setImageName] = useState(localStorage.getItem('savedImage') || '');
 const [isImageSaved, setIsImageSaved] = useState(false);
  const dispatch = useDispatch()

  // Guardar en el local Storage (2 siguientes funciones)
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSaveForm = (event) => {
    event.preventDefault();
    const jsonData = JSON.stringify(formData);
    localStorage.setItem('formData', jsonData);
  };

  const onSubmitRecinto = (e) => {
    e.preventDefault();
    console.log(formData.imagenRecinto)
    const imagenR = localStorage.getItem('savedImage')
    let recintoData = new FormData();
    recintoData.append('aforo', +formData.aforo)
    recintoData.append('numeroAccesos', +formData.accesos)
    recintoData.append('accesoDiscapacitados', formData.discapacitados)
    recintoData.append('numeroPlantas', +formData.plantas)
    recintoData.append('ascensor', formData.ascensor)
    recintoData.append('numeroAseos', +formData.aseos)
    recintoData.append('wifi', formData.wifi)
    recintoData.append('parking', formData.parking)
    recintoData.append('transportePublico', formData.transporte)
    recintoData.append('salidasEmergencia', +formData.emergencia)
    recintoData.append('zonaRestauracion', formData.restauracion)
    recintoData.append('zonaExterior', formData.exterior)
    recintoData.append('zonaInterior', formData.interior)
    recintoData.append('salasPrivadas', formData.privadas)
    recintoData.append('imagenRecinto', imageName)
    dispatch(createRecinto(recintoData))
    console.log(recintoData)
  };

 
 
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImageName(file);

  };
  const handleDeleteImage = () => {
    setImageName("");
    localStorage.removeItem("savedImage");
  };
  const saveImageLs = () => {
    localStorage.removeItem("imageName");
    localStorage.setItem("savedImage", imageName.name);
    setIsImageSaved(true);
  };



  // Parte de la vista del componente
  return (
    <>

      <div className="recinto-main-container">
        <div className="recinto-mvl">
          <img className="tlf1" src={Tlf} alt="" />
        </div>

        <div className="recinto-content">
          <h2>Recinto del evento</h2>
          <div>
            <div className="sendimg-container">
              { /* Label blanco que contiene la imagen del recinto*/ }
              <div className="first-label-recinto">
                <div>
                  <p className="mapa">Mapa</p>
                  <p className="mapa-text">
                    Carga aquí el mapa del recinto. El archivo debe tener unas
                    dimensiones de XXpx x XXpx y estar en formato .jpg o .png
                  </p>
                </div>
                <div className="btn-first-lbl">
                  <div className="icons">
                    <label htmlFor="file-input" className="icon">
                      <HiMagnifyingGlass />
                      <input
                        id="file-input"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: "none" }}
                      />
                    </label>
                    <HiOutlineTrash onClick={handleDeleteImage} />
                  </div>
                  {imageName && (
                    <p className={`img-charge ${isImageSaved ? "saved" : ""}`}>
                      {imageName.name}
                    </p>
                  )}
                  <div>
                    <BtnSave onClick={saveImageLs} />
                  </div>
                </div>
              </div>

              { /* Label blanco que contiene los inputs del recinto*/ }
              <div className="second-label-recinto">
                <form>
                  <div className="row">
                    <div className="inputs">
                      <label htmlFor="aforo">Aforo:</label>
                      <input
                        type="number"
                        id="aforo"
                        name="aforo"
                        min="0"
                        step="1"
                        value={formData.aforo}
                        onChange={handleInputChange}

                      />
                    </div>
                    <div className="inputs">
                      <label htmlFor="accesos">Nº de accesos:</label>
                      <input
                        type="number"
                        id="accesos"
                        name="accesos"
                        min="1"
                        step="1"
                        value={formData.accesos}
                        onChange={handleInputChange}

                      />
                    </div>
                    <div className="inputs">
                      <label htmlFor="discapacitados">Acceso discapacitados:</label>
                      <select name="discapacitados" value={formData.discapacitados} onChange={handleInputChange}>
                        <option value="true">Si</option>
                        <option value="false">No</option>
                      </select>
                    </div>
                  </div>

                  <div className="row">
                    <div className="inputs">
                      <label htmlFor="plantas">Nº de plantas:</label>
                      <input
                        type="number"
                        id="plantas"
                        name="plantas"
                        min="1"
                        step="1"
                        value={formData.plantas}
                        onChange={handleInputChange}

                      />
                    </div>
                    <div className="inputs">
                      <label htmlFor="ascensor">Ascensor:</label>
                      <select name="ascensor" value={formData.ascensor} onChange={handleInputChange}>
                        <option value="true">Si</option>
                        <option value="false">No</option>
                      </select>{" "}
                    </div>
                    <div className="inputs">
                      <label htmlFor="aseos">Nº de aseos:</label>
                      <input
                        type="number"
                        id="aseos"
                        name="aseos"
                        min="1"
                        step="1"
                        value={formData.aseos}
                        onChange={handleInputChange}

                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="inputs">
                      <label htmlFor="wifi">WIFI:</label>
                      <select name="wifi" value={formData.wifi} onChange={handleInputChange}>
                        <option value="true">Si</option>
                        <option value="false">No</option>
                      </select>
                    </div>
                    <div className="inputs">
                      <label htmlFor="parking">Parking:</label>
                      <select name="parking" value={formData.parking} onChange={handleInputChange}>
                        <option value="true">Si</option>
                        <option value="false">No</option>
                      </select>
                    </div>
                    <div className="inputs">
                      <label htmlFor="transporte">Transporte público:</label>
                      <select name="transporte" value={formData.transporte} onChange={handleInputChange}>
                        <option value="true">Si</option>
                        <option value="false">No</option>
                      </select>
                    </div>
                  </div>

                  <div className="row two">
                    <div className="inputs">
                      <label htmlFor="emergencia">
                        Nº de salidas de emergencia:
                      </label>
                      <input
                        type="number"
                        id="emergencia"
                        name="emergencia"
                        min="1"
                        step="1"
                        value={formData.emergencia}
                        onChange={handleInputChange}

                      />
                    </div>

                    <div className="inputs">
                      <label htmlFor="restauracion">Zona restauración:</label>
                      <select name="restauracion" value={formData.restauracion} onChange={handleInputChange}>
                        <option value="true">Si</option>
                        <option value="false">No</option>
                      </select>
                    </div>
                  </div>

                  <div className="row">
                    <div className="inputs">
                      <label htmlFor="exterior">Zona exterior:</label>
                      <select name="exterior" value={formData.exterior} onChange={handleInputChange}>
                        <option value="true">Si</option>
                        <option value="false">No</option>
                      </select>
                    </div>
                    <div className="inputs">
                      <label htmlFor="interior">Zona interior:</label>
                      <select name="interior" value={formData.interior} onChange={handleInputChange}>
                        <option value="true">Si</option>
                        <option value="false">No</option>
                      </select>
                    </div>
                    <div className="inputs">
                      <label htmlFor="privadas">Salas privadas:</label>
                      <select name="privadas" value={formData.privadas} onChange={handleInputChange}>
                        <option value="true">Si</option>
                        <option value="false">No</option>
                      </select>
                    </div>
                  </div>
                </form>
                <div className="btn">
                  <BtnSave onClick={handleSaveForm} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      { /* Label blanco que contiene la imagen del recinto*/ }
      <div>
        <div className="next-recinto-container">
          <p className="steps">3 Pasos de 3 Completados</p>
          <p className="points">● ● ●</p>
          <div className="btns">
            <BtnRevision onClick={onSubmitRecinto} />
            <BtnPublish  />
          </div>
        </div>
      </div>
    </>
  );
}

export default RecintoEvento;
