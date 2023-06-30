import React, { useState, useEffect } from 'react';
import { Link, useLocation  } from 'react-router-dom';


function Sidebar({ setActiveLink, activeLink }) {

  // Функция раскрытия слайдбара бокового
    function openSlidenav(index) {
      setStates(prevStates => {
        const newStates = [...prevStates];
        const newState = { ...newStates[index] };
        if (document.querySelector('.sidenav__link').classList.contains('one')) {
          newStates.forEach((state, i) => {
            if (i !== index) {
              state.isActive = false;
            }
          });
          document.querySelectorAll('.second-level').forEach((el, i) => {
            if (i !== index) {
              el.style.display = 'none';
            }
          });
        }
        newState.isActive = !newState.isActive;
        newState.isExpanded = !newState.isExpanded;
        newStates[index] = newState;
        return newStates;
      });
    }


  // Выделение цветом открытой вкладки без стрелки
    const location = useLocation();
      useEffect(() => {
        setActiveLink(location.pathname);
      }, [location.pathname , setActiveLink]);


  //  Выделение цветом открытой вкладки со стрелкой
    const [states, setStates] = useState(Array(2).fill({ isActive: false, isExpanded: false }));

  return (
    
    <div className="sidenav">
        <div className="sidenav__logo">
            <h2 className="sidenav__title">IBS Project</h2>
        </div>
        <div className="sidenav__link">

            {/* Вкладка "Заказы" */}
            <div
                  className={`sidenav__item ${activeLink === '/orders/' ? 'active' : ''}`}
                  onClick={() => setActiveLink('/orders/')}>
              <Link to={{ pathname: `/orders/`, fromDashboard: false }}>
                <div className="first-level">
                  <span className="first-level__text">Заказы</span>
                </div>
              </Link>
            </div>
            
            {/* Вкладка "Проекты" */}
            <div
                  className={`sidenav__item ${activeLink === '/projects/' ? 'active' : ''}`}
                  onClick={() => setActiveLink('/projects/')}>
              <Link to={{ pathname: `/projects/`, fromDashboard: false }}>
                <div className="first-level">
                  <span className="first-level__text">Проекты</span>
                </div>
              </Link>
            </div>

            {/* Вкладка "Подготовка документов" */}
            <div className={`sidenav__item ${(
                                          activeLink === '/offers/' || 
                                          activeLink === '/contract-annexes/' || 
                                          activeLink === '/purchase-orders/'
                                          ) ? 'active' : ''}`}>
                <div className={`first-level first-level_arrow ${states[0].isActive ? 'active' : ''}`} onClick={() => openSlidenav(0)}>
                    <span className="first-level__text">Подготовка документов</span>
                </div>
                <div className="second-level" style={{ display: states[0].isExpanded ? 'block' : 'none' }}>
                    <div className="second-level__block">
                      <Link to={{ pathname: `/offers/`, fromDashboard: false }} className={` ${activeLink === '/offers/' ? 'active' : ''}`}>
                          <span className="second-level__text" onClick={() => setActiveLink('/offers/')}>КП</span>
                      </Link>
                      <Link to={{ pathname: `/contract-annexes/`, fromDashboard: false }}  className={` ${activeLink === '/contract-annexes/' ? 'active' : ''}`}>
                          <span className="second-level__text" onClick={() => setActiveLink('/contract-annexes/')}>Приложение</span>
                      </Link>
                      <Link to={{ pathname: `/purchase-orders/`, fromDashboard: false }}  className={` ${activeLink === '/purchase-orders/' ? 'active' : ''}`}>
                          <span className="second-level__text" onClick={() => setActiveLink('/purchase-orders/')}>PO</span>
                      </Link>
                    </div>
                </div>
            </div>

            {/* Вкладка "Технические проекты" */}
            <div className={`sidenav__item ${(
                                          activeLink === '/key-exchange/' || 
                                          activeLink === '/testing-cards/'
                                          ) ? 'active' : ''}`}>
                <div className={`first-level first-level_arrow ${states[1].isActive ? 'active' : ''}`} onClick={() => openSlidenav(1)}>
                    <span className="first-level__text">Технические проекты</span>
                </div>
                <div className="second-level" style={{ display: states[1].isExpanded ? 'block' : 'none' }}>
                    <div className="second-level__block">
                      <Link to={{ pathname: `/key-exchange/`, fromDashboard: false }} className={` ${activeLink === '/key-exchange/' ? 'active' : ''}`}>
                          <span className="second-level__text" onClick={() => setActiveLink('/key-exchange/')}>Обмен ключами</span>
                      </Link>
                      <Link to={{ pathname: `/testing-cards/`, fromDashboard: false }} className={` ${activeLink === '/testing-cards/' ? 'active' : ''}`}>
                          <span className="second-level__text" onClick={() => setActiveLink('/testing-cards/')}>Тестовые карты</span>
                      </Link>
                    </div>
                </div>
            </div>

            {/* Вкладка "Справочник" */}
            <div
                  className={`sidenav__item ${activeLink === '/dictionary/' ? 'active' : ''}`}
                  onClick={() => setActiveLink('/dictionary/')}>
              <Link to={{ pathname: `/dictionary/`, fromDashboard: false }}>
                <div className="first-level">
                  <span className="first-level__text">Справочник</span>
                </div>
              </Link>
            </div>
        </div>
    </div>

  );
}

export default Sidebar;
