package base

import (
	"net/http"
	"os"

	"github.com/Kasgai/kasgai-server/controllers"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

// Run makes api server and  web server
func Run() {
	r := mux.NewRouter()

	// authorization
	r.HandleFunc("/auth", controllers.Authorize).Methods("GET")
	r.HandleFunc("/callback", controllers.Callback).Methods("GET")

	// api server
	r.HandleFunc("/api/upload", controllers.PostImage).Methods("POST")

	// web server
	r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "./kasgai/index.html")
	})
	r.PathPrefix("/").Handler(http.FileServer(http.Dir("./kasgai/")))

	http.Handle("/", handlers.CombinedLoggingHandler(os.Stderr, r))
}

func useContext(handler http.Handler) http.Handler {
	fn := func(w http.ResponseWriter, r *http.Request) {
		handler.ServeHTTP(w, r)
	}
	return http.HandlerFunc(fn)
}
