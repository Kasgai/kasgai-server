package controllers

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/Kasgai/kasgai-server/imageutils"
	"github.com/Kasgai/kasgai-server/models"
)

func PostImage(w http.ResponseWriter, r *http.Request) {
	err := r.ParseMultipartForm(600000)
	if err != nil {
		fmt.Printf("%s", err)
		models.SendUnprocessableEntity(w)
		return
	}

	file, _, err := r.FormFile("uploadImage")
	if err != nil {
		models.SendUnprocessableEntity(w)
		return
	}
	defer file.Close()

	userID, err := strconv.Atoi(r.FormValue("userID"))
	if err != nil || userID <= 0 {
		models.SendBadRequest(w)
		return
	}

	url, err := imageutils.ImageUploader(file, userID)
	if err != nil {
		models.SendBadGateway(w)
		fmt.Printf("%s", err)
		return
	}

	fmt.Printf("%s", url)

	models.SendCreated(w)
}
