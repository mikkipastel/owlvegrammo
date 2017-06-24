// Copyright 2016 Google Inc.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//      http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var dataCacheName = 'Owlvegrammo-v1';
var cacheName = 'Owlvegrammo-1';
var filesToCache = [
  '/',
  '/favicon.ico',
  '/index.html',
  '/about.html',
  '/01-introduction-of-programming/1.html',
  '/01-introduction-of-programming/2.html',
  '/01-introduction-of-programming/3.html',
  '/01-introduction-of-programming/4.html',
  '/01-introduction-of-programming/5.html',
  '/01-introduction-of-programming/6.html',
  '/03-python-for-beginer/1.html',
  '/03-python-for-beginer/2.html',
  '/03-python-for-beginer/3.html',
  '/03-python-for-beginer/4.html',
  '/03-python-for-beginer/5.html',
  '/03-python-for-beginer/6.html',
  '/03-python-for-beginer/7.html',
  '/03-python-for-beginer/8.html',
  '/03-python-for-beginer/9.html',
  '/03-python-for-beginer/10.html',
  '/03-python-for-beginer/11.html',
  '/03-python-for-beginer/12.html',
  '/fonts/roboto/Roboto-Bold.woff',
  '/fonts/roboto/Roboto-Bold.woff2',
  '/fonts/roboto/Roboto-Light.woff',
  '/fonts/roboto/Roboto-Light.woff2',
  '/fonts/roboto/Roboto-Medium.woff',
  '/fonts/roboto/Roboto-Medium.woff2',
  '/fonts/roboto/Roboto-Regular.woff',
  '/fonts/roboto/Roboto-Regular.woff2',
  '/fonts/roboto/Roboto-Thin.woff',
  '/fonts/roboto/Roboto-Thin.woff2',
  '/js/app.js',
  '/js/materialize.js',
  '/js/materialize.min.js',
  '/css/style.css',
  '/css/materialize.css',
  '/css/materialize.min.css',
  '/images/cover_basic_of_C.jpg',
  '/images/cover_introduction_of_programming.jpg',
  '/images/cover_python_for_beginer.png',
  '/images/introduction_programming_01.jpg',
  '/images/introduction_programming_02.jpg',
  '/images/introduction_programming_03.png',
  '/images/introduction_programming_04.png',
  '/images/python_beginner_01.png',
  '/images/python_beginner_02.png'
];

// for offline mode
self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate',  event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, {ignoreSearch:true}).then(response => {
      return response || fetch(event.request);
    })
  );
});


// for push notification
self.registration.showNotification(title, options);

self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  console.log('[Service Worker] Push had this data: "${event.data.text()}"');

  const title = 'Push Codelab';
  const options = {
    body: 'Yay it works.',
    icon: 'images/icon.png',
    badge: 'images/badge.png'
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received.');

  event.notification.close();

  event.waitUntil(
    clients.openWindow('https://owlvegrammo.firebaseapp.com')
  );
});