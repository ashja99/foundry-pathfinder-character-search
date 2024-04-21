/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app/search-app.ts":
/*!*******************************!*\
  !*** ./src/app/search-app.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SearchAppConfig: () => (/* binding */ SearchAppConfig)
/* harmony export */ });
class SearchAppConfig extends FormApplication {
    constructor() {
        super(...arguments);
        this.searchButtonHTML = `
    <a class='character-search-icon-button'><i class="fa-solid fa-fw fa-search"></i></a>
  `;
    }
    log(...args) {
        console.log('CharacterSearch |', ...args);
    }
    static get defaultOptions() {
        const defaults = super.defaultOptions;
        const overrides = {
            height: 'auto',
            id: this.searchAppId,
            template: `modules/${this.searchAppId}/templates/search-window.hbs`,
            title: 'Character Search',
        };
        const mergedOptions = foundry.utils.mergeObject(defaults, overrides);
        return mergedOptions;
    }
    async _updateObject(event, formData) {
        this.log(event, formData);
        this.log("updateObject not implemented.");
    }
    onSheetRender(html) {
        const characterDetails = html.find(`h4.window-title`);
        characterDetails.append(this.searchButtonHTML);
        html.on('click', '.character-search-icon-button', (_) => {
            this.log('Button Clicked!');
            this.render(true);
        });
    }
}
SearchAppConfig.searchAppId = 'foundry-pathfinder-character-search';


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_search_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/search-app */ "./src/app/search-app.ts");

console.log('hello world from index.ts still working');
let app;
Hooks.once('init', () => {
    app = new _app_search_app__WEBPACK_IMPORTED_MODULE_0__.SearchAppConfig({});
});
Hooks.on('renderCharacterSheetPF2e', (_, html) => {
    app.onSheetRender(html);
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQU8sTUFBTSxlQUFnQixTQUFRLGVBQWU7SUFBcEQ7O1FBRVMscUJBQWdCLEdBQUk7O0dBRTFCLENBQUM7SUFvQ0osQ0FBQztJQWxDUyxHQUFHLENBQUMsR0FBRyxJQUFXO1FBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUYsTUFBTSxLQUFLLGNBQWM7UUFDdEIsTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLGNBQWMsQ0FBQztRQUV0QyxNQUFNLFNBQVMsR0FBRztZQUNoQixNQUFNLEVBQUUsTUFBTTtZQUNkLEVBQUUsRUFBRSxJQUFJLENBQUMsV0FBVztZQUNwQixRQUFRLEVBQUUsV0FBVyxJQUFJLENBQUMsV0FBVyw4QkFBOEI7WUFDbkUsS0FBSyxFQUFFLGtCQUFrQjtTQUMxQixDQUFDO1FBRUYsTUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBRXJFLE9BQU8sYUFBYSxDQUFDO0lBQ3ZCLENBQUM7SUFFUSxLQUFLLENBQUMsYUFBYSxDQUFDLEtBQVksRUFBRSxRQUE2QjtRQUN0RSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsR0FBRyxDQUFDLCtCQUErQixDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVPLGFBQWEsQ0FBQyxJQUF5QjtRQUM1QyxNQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUN0RCxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFFL0MsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsK0JBQStCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUN0RCxJQUFJLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7O0FBckNNLDJCQUFXLEdBQUcscUNBQXFDLENBQUM7Ozs7Ozs7VUNEN0Q7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05tRDtBQUVuRCxPQUFPLENBQUMsR0FBRyxDQUFDLHlDQUF5QyxDQUFDLENBQUM7QUFDdkQsSUFBSSxHQUFRLENBQUM7QUFFYixLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUU7SUFDdEIsR0FBRyxHQUFHLElBQUksNERBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNoQyxDQUFDLENBQUMsQ0FBQztBQUVILEtBQUssQ0FBQyxFQUFFLENBQUMsMEJBQTBCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUU7SUFDaEQsR0FBRyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN6QixDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2ZvdW5kcnktcGF0aGZpbmRlci1jaGFyYWN0ZXItc2VhcmNoLy4vc3JjL2FwcC9zZWFyY2gtYXBwLnRzIiwid2VicGFjazovL2ZvdW5kcnktcGF0aGZpbmRlci1jaGFyYWN0ZXItc2VhcmNoL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2ZvdW5kcnktcGF0aGZpbmRlci1jaGFyYWN0ZXItc2VhcmNoL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9mb3VuZHJ5LXBhdGhmaW5kZXItY2hhcmFjdGVyLXNlYXJjaC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2ZvdW5kcnktcGF0aGZpbmRlci1jaGFyYWN0ZXItc2VhcmNoL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZm91bmRyeS1wYXRoZmluZGVyLWNoYXJhY3Rlci1zZWFyY2gvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIFNlYXJjaEFwcENvbmZpZyBleHRlbmRzIEZvcm1BcHBsaWNhdGlvbiB7XHJcbiAgc3RhdGljIHNlYXJjaEFwcElkID0gJ2ZvdW5kcnktcGF0aGZpbmRlci1jaGFyYWN0ZXItc2VhcmNoJztcclxuICBwdWJsaWMgc2VhcmNoQnV0dG9uSFRNTCA9ICBgXHJcbiAgICA8YSBjbGFzcz0nY2hhcmFjdGVyLXNlYXJjaC1pY29uLWJ1dHRvbic+PGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1mdyBmYS1zZWFyY2hcIj48L2k+PC9hPlxyXG4gIGA7XHJcblxyXG4gIHByaXZhdGUgbG9nKC4uLmFyZ3M6IGFueVtdKSB7XHJcbiAgICBjb25zb2xlLmxvZygnQ2hhcmFjdGVyU2VhcmNoIHwnLCAuLi5hcmdzKTtcclxuICB9XHJcblxyXG5cdHN0YXRpYyBnZXQgZGVmYXVsdE9wdGlvbnMoKSB7XHJcbiAgICBjb25zdCBkZWZhdWx0cyA9IHN1cGVyLmRlZmF1bHRPcHRpb25zO1xyXG4gIFxyXG4gICAgY29uc3Qgb3ZlcnJpZGVzID0ge1xyXG4gICAgICBoZWlnaHQ6ICdhdXRvJyxcclxuICAgICAgaWQ6IHRoaXMuc2VhcmNoQXBwSWQsXHJcbiAgICAgIHRlbXBsYXRlOiBgbW9kdWxlcy8ke3RoaXMuc2VhcmNoQXBwSWR9L3RlbXBsYXRlcy9zZWFyY2gtd2luZG93Lmhic2AsXHJcbiAgICAgIHRpdGxlOiAnQ2hhcmFjdGVyIFNlYXJjaCcsXHJcbiAgICB9O1xyXG4gIFxyXG4gICAgY29uc3QgbWVyZ2VkT3B0aW9ucyA9IGZvdW5kcnkudXRpbHMubWVyZ2VPYmplY3QoZGVmYXVsdHMsIG92ZXJyaWRlcyk7XHJcbiAgICBcclxuICAgIHJldHVybiBtZXJnZWRPcHRpb25zO1xyXG4gIH1cclxuXHJcblx0cHJvdGVjdGVkIGFzeW5jIF91cGRhdGVPYmplY3QoZXZlbnQ6IEV2ZW50LCBmb3JtRGF0YT86IG9iamVjdCB8IHVuZGVmaW5lZCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgdGhpcy5sb2coZXZlbnQsIGZvcm1EYXRhKTtcclxuXHRcdHRoaXMubG9nKFwidXBkYXRlT2JqZWN0IG5vdCBpbXBsZW1lbnRlZC5cIik7XHJcblx0fVxyXG5cclxuICBwdWJsaWMgb25TaGVldFJlbmRlcihodG1sOiBKUXVlcnk8SFRNTEVsZW1lbnQ+KSB7XHJcbiAgICBjb25zdCBjaGFyYWN0ZXJEZXRhaWxzID0gaHRtbC5maW5kKGBoNC53aW5kb3ctdGl0bGVgKTtcclxuICAgIGNoYXJhY3RlckRldGFpbHMuYXBwZW5kKHRoaXMuc2VhcmNoQnV0dG9uSFRNTCk7XHJcbiAgXHJcbiAgICBodG1sLm9uKCdjbGljaycsICcuY2hhcmFjdGVyLXNlYXJjaC1pY29uLWJ1dHRvbicsIChfKSA9PiB7XHJcbiAgICAgIHRoaXMubG9nKCdCdXR0b24gQ2xpY2tlZCEnKTtcclxuICAgICAgdGhpcy5yZW5kZXIodHJ1ZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBTZWFyY2hBcHBDb25maWcgfSBmcm9tICcuL2FwcC9zZWFyY2gtYXBwJztcclxuXHJcbmNvbnNvbGUubG9nKCdoZWxsbyB3b3JsZCBmcm9tIGluZGV4LnRzIHN0aWxsIHdvcmtpbmcnKTtcclxubGV0IGFwcDogYW55O1xyXG5cclxuSG9va3Mub25jZSgnaW5pdCcsICgpID0+IHtcclxuICBhcHAgPSBuZXcgU2VhcmNoQXBwQ29uZmlnKHt9KTtcclxufSk7XHJcblxyXG5Ib29rcy5vbigncmVuZGVyQ2hhcmFjdGVyU2hlZXRQRjJlJywgKF8sIGh0bWwpID0+IHtcclxuXHRhcHAub25TaGVldFJlbmRlcihodG1sKTtcclxufSk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9