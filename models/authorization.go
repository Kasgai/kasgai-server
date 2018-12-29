package models

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"

	"cloud.google.com/go/datastore"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

// User data
type User struct {
	UserInfo
	Oauth2Token *oauth2.Token
}

// UserInfo is struct of google userinfo
type UserInfo struct {
	ID         string `json:"id"`
	Name       string `json:"name"`
	GivenName  string `json:"given_name"`
	FamilyName string `json:"family_name"`
	Picture    string `json:"picture"`
	Gender     string `json:"gender"`
	Locale     string `json:"locale"`
}

const clientSecretJSON = "client_secret.json"

// AuthCodeURL load authorization URL
func AuthCodeURL() string {
	configFile, _ := ioutil.ReadFile(clientSecretJSON)
	config, _ := google.ConfigFromJSON(configFile)

	config.Scopes = []string{
		"https://www.googleapis.com/auth/userinfo.email",
		"https://www.googleapis.com/auth/userinfo.profile",
	}
	return config.AuthCodeURL("state")
}

// StoringData save user data to datastore
func StoringData(ctx context.Context, user User) (*datastore.Key, error) {
	projectID := "kasgai-com"

	client, err := datastore.NewClient(ctx, projectID)
	if err != nil {
		return nil, err
	}

	// save user with id as key
	nameKey := datastore.NameKey("User", user.ID, nil)

	key, err := client.Put(ctx, nameKey, &user)
	if err != nil {
		return nil, err
	}

	fmt.Printf("Created new user with ID %d\n", key.ID)
	return key, nil
}

// GetOauth2Token get accesstoken form code
func GetOauth2Token(ctx context.Context, code string) (*oauth2.Token, error) {
	configFile, _ := ioutil.ReadFile(clientSecretJSON)
	config, _ := google.ConfigFromJSON(configFile)
	token, err := config.Exchange(ctx, code)
	if err != nil {
		return nil, err
	}
	return token, nil
}

// GetUserInfo to get userinfo form google api
func GetUserInfo(ctx context.Context, token *oauth2.Token) (UserInfo, error) {
	var usrInf UserInfo

	configFile, _ := ioutil.ReadFile(clientSecretJSON)
	config, _ := google.ConfigFromJSON(configFile)
	client := config.Client(ctx, token)

	response, err := client.Get("https://www.googleapis.com/oauth2/v2/userinfo?access_token=" + token.AccessToken)
	if err != nil {
		return usrInf, err
	}
	defer response.Body.Close()

	body, err := ioutil.ReadAll(response.Body)
	if err != nil {
		return usrInf, err
	}
	if err := json.Unmarshal(body, &usrInf); err != nil {
		return usrInf, err
	}
	return usrInf, nil
}
