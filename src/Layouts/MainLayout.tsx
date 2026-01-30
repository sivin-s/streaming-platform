import {Outlet} from 'react-router';
import {HeaderComponent,FooterComponent, MainComponent } from '../components/index.components'


/*
  No home page is needed. Because we already created Main layout
*/


export const MainLayout: React.FC =()=>(
    <>
      <MainComponent>
        <HeaderComponent />
             {/* NOte : sectionComponent is <outlet/>*/}
                  <Outlet /> {/* pass values just like create context (no create context used) */}
          <FooterComponent/>
       </MainComponent>
    </>
)
