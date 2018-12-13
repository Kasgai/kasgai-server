package models

import (
	"encoding/json"
	"fmt"
	"net/http"
)

// Response is keys of response json
type Response struct {
	Status      int    `json:"status"`
	Message     string `json:"message"`
	contentType string
	writer      http.ResponseWriter
}

// Send returns response
func (r *Response) Send() {
	r.writer.Header().Set("Content-Type", r.contentType)
	r.writer.WriteHeader(r.Status)

	output, _ := json.Marshal(&r)
	fmt.Fprintf(r.writer, string(output))
}

// CreateDefaultResponse define response format
func CreateDefaultResponse(w http.ResponseWriter) Response {
	return Response{Status: http.StatusOK, writer: w, contentType: "application/json"}
}

// SendOK returns OK response
func SendOK(w http.ResponseWriter) {
	response := CreateDefaultResponse(w)
	response.Status = http.StatusOK
	response.Message = "OK"
	response.Send()
}

// SendCreated returns Created response
func SendCreated(w http.ResponseWriter) {
	response := CreateDefaultResponse(w)
	response.Status = http.StatusCreated
	response.Message = "Created"
	response.Send()
}

// SendBadRequest returns Bad Request response
func SendBadRequest(w http.ResponseWriter) {
	response := CreateDefaultResponse(w)
	response.Status = http.StatusBadRequest
	response.Message = "Bad Request"
	response.Send()
}

// SendUnprocessableEntity returns Unprocessable Entity response
func SendUnprocessableEntity(w http.ResponseWriter) {
	response := CreateDefaultResponse(w)
	response.Status = http.StatusUnprocessableEntity
	response.Message = "Unprocessable Entity"
	response.Send()
}

// SendInternalServerError returns Internal Server Error Response
func SendInternalServerError(w http.ResponseWriter) {
	response := CreateDefaultResponse(w)
	response.Status = http.StatusInternalServerError
	response.Message = "Internal Server Error"
	response.Send()
}

// SendBadGateway returns Bad Gateway response
func SendBadGateway(w http.ResponseWriter) {
	response := CreateDefaultResponse(w)
	response.Status = http.StatusBadGateway
	response.Message = "Bad Gateway"
	response.Send()
}
