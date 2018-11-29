package controllers

import (
	"fmt"
	"io/ioutil"
	"net/http"

	"golang.org/x/oauth2/google"
)

// Authorize this application
func Authorize(w http.ResponseWriter, r *http.Request) {
	configFile, err := ioutil.ReadFile("client_secret.json")
	if err != nil {
		fmt.Println(err)
	}

	config, err := google.ConfigFromJSON(configFile)
	if err != nil {
		fmt.Println(err)
	}

	config.Scopes = []string{
		"https://www.googleapis.com/auth/userinfo.profile",
	}
	authURL := config.AuthCodeURL("state")
	http.Redirect(w, r, authURL, http.StatusFound)
}

// Callback from Authorize
func Callback(w http.ResponseWriter, r *http.Request) {

	http.Redirect(w, r, "/", http.StatusFound)
}
