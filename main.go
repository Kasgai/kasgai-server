package main

import (
	"net/http"
	"os"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"

	"google.golang.org/appengine"
)

func main() {
	run()
	appengine.Main()
}

func run() {
	r := mux.NewRouter()

	r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "./kasgai/index.html")
	})
	r.PathPrefix("/").Handler(http.FileServer(http.Dir("./kasgai/")))

	http.Handle("/", handlers.CombinedLoggingHandler(os.Stderr, r))
}
