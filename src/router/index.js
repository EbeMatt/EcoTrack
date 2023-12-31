import  { createRouter, createWebHistory }  from 'vue-router'

import HomeView from '@/components/HomeView.vue';
import EcoTrack from '@/components/EcoTrack.vue';
import SaveTipps from '@/components/SaveTipps.vue';
import MyDate from '@/components/MyDate.vue';
import MyPersonalData from '@/components/MyPersonalData.vue';
import PersonDate from '@/components/PersonDate.vue';
import GroceriesFood from '@/components/GroceriesFood.vue';
import VehicleCar from '@/components/VehicleCar.vue';
import HouseFlat from '@/components/HouseFlat.vue';
import TrashWaste from '@/components/TrashWaste.vue';
import PurchasesBuy from '@/components/PurchasesBuy.vue';
import DashboardKlima from '@/components/DashboardKlima.vue';
import ChartHouse from '@/components/ChartHouse.vue';
import FormularC02 from '@/components/FormularC02.vue';
import FormularC02Kraftsoff from '@/components/FormularC02Kraftstoff';
import BerechnungProFahrt from '@/components/BerechnungProFahrt';
import BillReader from '@/components/BillReader';
import DashboardResult from'@/components/DashboardResult';
import HeaderBerechnungProFahrt from '@/components/HeaderBerechnungProFahrt';
import BerechnungsGrundlageFahrzeug from '@/components/BerechnungsGrundlageFahrzeug.vue';
import SloganEcotrack from '@/components/SloganEcotrack.vue';
import DataRights from '@/components/DataRights.vue';
import ForgottPassword from '@/components/ForgottPassword.vue';
import GameCenter from '@/components/GameCenter.vue';
import GameCenterInfo from '@/components/GameCenterInfo.vue';
import NavBarGameCenter from '@/components/NavBarGameCenter.vue';
import GameCenterSetUp from '@/components/GameCenterSetUp.vue';
import DataPersonTable from '@/components/DataPersonTable.vue';




const routes = [
    {
      path: '/home',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/ecotrack',
      name: 'EcoTrack',
      component: EcoTrack
    },
    {
      path: '/savetipps',
      name: 'SaveTipps',
      component: SaveTipps
    },
    {
      path: '/mydate',
      name: 'MyDate',
      component: MyDate
    },
    {
      path: '/mypersonaldata',
      name: 'MyPersonalData',
      component: MyPersonalData
    },
    {
      path: '/persondate',
      name: 'PersonDate',
      component: PersonDate
    },
    {
      path: '/groceriesfood',
      name: 'GroceriesFood',
      component: GroceriesFood
    },

    {
      name: 'VehicleCar',
      path: '/vehiclecar',
      component: VehicleCar
    },
    {
      name: 'HouseFlat',
      path: '/houseflat',
      component: HouseFlat
    },
    {
      name: 'TrashWaste',
      path: '/trashwaste',
      component: TrashWaste
    },
    {
      name: 'PurchasesBuy',
      path: '/purchasesbuy',
      component: PurchasesBuy
    },
    {
      name: 'DashboardKlima',
      path: '/dashboardklima',
      component: DashboardKlima
    },
    {
      name: 'ChartHouse',
      path: '/charthouse',
      component: ChartHouse
    },
    {
      name: 'FormularC02',
      path: '/formularc02',
      component: FormularC02

    },
    {
      name: 'FormularC02Kraftstoff',
      path:'/formularc02kraftstoff',
      component: FormularC02Kraftsoff

    },
    {
      name: 'BerechnungProFahrt',
      path: '/berechnungprofahrt',
      component: BerechnungProFahrt
    },
    {
      name: 'BillReader',
      path: '/billreader',
      component: BillReader

    },
    {
      name: 'DashboardResult',
      path: '/dashboardresult',
      component: DashboardResult

    },
    {
      name: 'HeaderBerechnungProFahrt',
      path: '/headerberechnungprofahrt',
      component: HeaderBerechnungProFahrt
    },
    {
      name: 'BerechnungsGrundlageFahrzeug',
      path: '/berechnungsgrundlagefahrzeug',
      component: BerechnungsGrundlageFahrzeug 
    },
    {
      name: 'SloganEcotrack',
      path: '/sloganecotrack',
      component: SloganEcotrack
    },
    {
      name: 'DataRights',
      path: '/datarights',
      component: DataRights
    },
    {
      name: 'ForgottPasword',
      path: '/forgottpassword',
      component: ForgottPassword,
    },
    {
      name: 'GameCenter',
      path: '/gamecenter',
      component: GameCenter,
    },
    {
      name: 'GameCenterInfo',
      path: '/gamecenterinfo',
      component: GameCenterInfo,
    },
    {
      name: 'NavBarGameCenter',
      path: '/navbargamecenter',
      component: NavBarGameCenter,
    },
    {
      name: 'GameCenterSetUp',
      path: '/gamecentersetup',
      component: GameCenterSetUp,
    },
    {
      name: 'DataPersonTable',
      path: '/datapersontable',
      component: DataPersonTable,
    },
    
    
  ];




const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router 