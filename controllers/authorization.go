package controllers

import (
	"fmt"
	"net/http"

	"github.com/Kasgai/kasgai-server/models"
	"google.golang.org/appengine"
)

// Authorize this application
func Authorize(w http.ResponseWriter, r *http.Request) {
	authURL := models.AuthCodeURL()
	http.Redirect(w, r, authURL, http.StatusFound)
}

// Callback from Authorize
func Callback(w http.ResponseWriter, r *http.Request) {
	code := r.URL.Query().Get("code")
	context := appengine.NewContext(r)

	oauth2Token := models.GetOauth2Token(context, code)
	fmt.Println(oauth2Token.AccessToken)

	userInfo, err := models.GetUserInfo(context, oauth2Token)
	if err != nil {
		http.Redirect(w, r, "/auth", http.StatusInternalServerError)
	}
	user := models.User{
		UserInfo:    userInfo,
		Oauth2Token: oauth2Token,
	}

	models.StoringData(context, user)
	http.Redirect(w, r, "/", http.StatusFound)
}
