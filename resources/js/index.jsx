import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom'

import App from "./js/app";
import RegisterForm from './components/RegisterForm';
import reportWebVitals from './reportWebVitals';

if (document.getElementById('root')) {
  console.log('Shitballs');
  ReactDOM.render(<App />, document.getElementById('root'));
}

ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    <Router>
      <Header resetSlider={resetSlider} Link={Link} loginStatus={loginStatus} setName={setName} setEmail={setEmail} setUser={setUser} setLoginStatus={setLoginStatus} LogoutForm={LogoutForm} />
      <Routes>
        <Route path="/" element={<Home user={user} Link={Link}  results={results} getResults={getResults} fetchResults={fetchResults} streamingServices={streamingServices} checkStreaming={checkStreaming} sliderPosition={sliderPosition} setSliderPosition={setSliderPosition} streamingId={streamingId} noStreaming={noStreaming} showType={showType} setShowType={setShowType} series={series} getSeries={getSeries} movies={movies} getMovies={getMovies} isLoading={isLoading} spinnerDegree={spinnerDegree} setSpinnerDegree={setSpinnerDegree} failedSearch={failedSearch} setFailedSearch={setFailedSearch} resizeResetSlider={resizeResetSlider} />} />

        <Route path="register" element={<RegisterForm setUser={setUser} setLoginStatus={setLoginStatus} passwordVisibility={passwordVisibility} setPasswordVisibility={setPasswordVisibility} changePasswordVisibility={changePasswordVisibility} />} />

        <Route path="login" element={<LoginForm setLoginStatus={setLoginStatus} loginStatus={loginStatus} setUser={setUser} setUserId={setUserId} passwordVisibility={passwordVisibility} setPasswordVisibility={setPasswordVisibility} changePasswordVisibility={changePasswordVisibility} resetSlider={resetSlider} />} />

        <Route path='my-series' element={<SeriesList user={user} series={series} getSeries={getSeries} movies={movies} getMovies={getMovies} Link={Link} checkStreaming={checkStreaming} sliderPosition={sliderPosition} setSliderPosition={setSliderPosition} streamingServices={streamingServices} streamingId={streamingId} noStreaming={noStreaming} loginStatus={loginStatus} isLoading={isLoading} spinnerDegree={spinnerDegree} setSpinnerDegree={setSpinnerDegree} resizeResetSlider={resizeResetSlider} />} />

        <Route path='my-movies' element={<MoviesList movies={movies} getMovies={getMovies} series={series} getSeries={getSeries} Link={Link} checkStreaming={checkStreaming} sliderPosition={sliderPosition} setSliderPosition={setSliderPosition} streamingServices={streamingServices}streamingId={streamingId} loginStatus={loginStatus} user={user} noStreaming={noStreaming}isLoading={isLoading} spinnerDegree={spinnerDegree} setSpinnerDegree={setSpinnerDegree} resizeResetSlider={resizeResetSlider} />} />

      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('app')
);

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
