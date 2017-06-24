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
  '/introduction-of-programming.html',
  '/python-for-beginer.html',
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
// self.registration.showNotification(title, options);

// self.addEventListener('push', function(event) {
  // console.log('[Service Worker] Push Received.');
  // console.log('[Service Worker] Push had this data: "${event.data.text()}"');

  // const title = 'Push Codelab';
  // const options = {
    // body: 'Yay it works.',
    // icon: 'images/icon.png',
    // badge: 'images/badge.png'
  // };

  // event.waitUntil(self.registration.showNotification(title, options));
// });

// self.addEventListener('notificationclick', function(event) {
  // console.log('[Service Worker] Notification click Received.');

  // event.notification.close();

  // event.waitUntil(
    // clients.openWindow('https://owlvegrammo.firebaseapp.com')
  // );
// });