/* global riot, componentHandler */
(function _ot_call_init () {

  "use strict";

  /**
   * Main App constructor with `riot.observable` interface.
   */
  function App () {
    // Make thyself observable
    riot.observable(this);

    var _publisher,
        _session,
        _subscriber;

    /**
     * Simple XHR handling with JSON response
     */
    this.xhr = function(method, url, callback) {
      var req = new XMLHttpRequest();
      req.addEventListener("load", function () {
        if (this.status !== 200) {
          callback(this.status);
          return;
        }
        callback(null, this.responseType === "json" ? this.response : this.responseText);
      });
      req.responseType = "json";
      req.addEventListener("error", function (e) {
        callback(e);
      });
      req.open(method, url);
      req.send();
    };

    /**
     * Utility for issuing a create call request
     */
    this.createCall = function () {
      var self = this;
      self.show_loader();
      self.xhr("GET", "/api/session/create", function (err, data) {
        if (err !== null) {
          self.trigger("404", "Could not start call");
          console.log("Could not start call", err);
          return;
        }
        self.trigger("callCreated", data);
      });
    };

    /**
     * Utility for fetching token based on call id
     */
    this.getToken = function (callId) {
      var self = this;
      this.xhr("GET", "/api/session/" + callId + "/token", function (err, data) {
        if (err !== null) {
          self.trigger("404", "Invalid call ID");
          console.log("Invalid call ID.", err);
          return;
        }
        self.trigger("tokenReceived", data);
      });
    };

    /**
     * Utility to change the main content view
     */
    this.change_view = function (view, data) {
      riot.mount("#content", view, { app: app, data: data || null });
      try {
        componentHandler.upgradeAllRegistered();
      } catch (e) {
        console.log("Unable to upgrade Material components", e);
      }
      this.trigger("view:change", view);
    };

    /**
     * Utility to show how a loader
     */
    this.show_loader = function () {
      this.change_view("view-loading", {});
    };

  }

  // Create an App instance
  var app = new App();

  // Default 404 handler
  app.on("404", function (msg) {
    msg = msg || "Not found";
    this.change_view("view-not-found", { msg: msg });
  });

  // Set event handlers
  app.on("callCreated", function (data) {
    riot.route("call/" + data.payload.id);
    this.getToken(data.payload.id);
  });

  app.on("tokenReceived", function (data) {
    this.change_view("view-call-start", data.payload);
  });

  // Mount riot tags
  riot.mount("*", { app: app });

  // Set up routes
  riot.route("call/*", function (id) {
    app.show_loader();
    app.getToken(id);
  });

  riot.route("end", function () {
    app.change_view("view-call-end");
  });

  riot.route(function (action, id) {
    if (action === "") {
      app.change_view("view-home");
      return;
    }
    app.trigger("404");
  });

  // Start looking up the current route
  riot.route.start(true);
})();
