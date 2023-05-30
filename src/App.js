import { Navigate } from "react-router-dom";


function App() {
  return (
    <div className="App">
      {localStorage.getItem("logintoken") ? (
        <Navigate to='/home' replace={true} /> 
      ) : (
        <Navigate to='/login' replace={true} />
        // replace:true로 기록을 남기지 않음(뒤로가기로 접근 방지)
      )}
    </div>
  );
}


export default App;
