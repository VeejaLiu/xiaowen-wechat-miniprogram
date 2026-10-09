import './App.css'
import {useState} from "react";
import GeneratePage from "./pages/GeneratePage.tsx";
import HistoryPage from "./pages/HistoryPage.tsx";
import NavBar from "./pages/NavBar.tsx";
import DrawPage from "./pages/DrawPage.tsx";


function App() {
    const [currentPage, setCurrentPage] = useState('generate'); // 初始页面

    // 根据用户的选择渲染不同的页面
    const renderPage = () => {
        switch (currentPage) {
            case 'generate':
                return <GeneratePage/>;
            case 'history':
                return <HistoryPage/>;
            case 'draw':
                return <DrawPage/>;
            // 添加更多页面组件
            default:
                return <GeneratePage/>;
        }
    };

    return (
        <div>
            <NavBar setCurrentPage={setCurrentPage}/>
            {renderPage()}
        </div>
    );
}

export default App;
