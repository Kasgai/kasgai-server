package imageutils

import (
	"context"
	"fmt"
	"io"
	"log"
	"mime/multipart"
	"time"

	"cloud.google.com/go/storage"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/option"
)

func ImageUploader(file multipart.File, userID int) (string, error) {
	log.SetFlags(0)

	var (
		projectID = "kasgai-com"
		bucket    = "kasgai-com.appspot.com"
		name      = ""
		isPublic  = true
	)

	date := time.Now()
	timestamp := date.Format("20060102150405")
	name = fmt.Sprintf("%s-%d", timestamp, userID)

	ctx := context.Background()

	_, objAttrs, err := upload(ctx, file, projectID, bucket, name, isPublic)
	if err != nil {
		return "", fmt.Errorf("failed to upload file, %v", err)
	}

	return objectURL(objAttrs), nil
}

func objectURL(objAttrs *storage.ObjectAttrs) string {
	return fmt.Sprintf("https://storage.googleapis.com/%s/%s", objAttrs.Bucket, objAttrs.Name)
}

func upload(ctx context.Context, r io.Reader, projectID, bucket, name string, public bool) (*storage.ObjectHandle, *storage.ObjectAttrs, error) {

	creds, err := google.FindDefaultCredentials(ctx, storage.ScopeReadOnly)
	if err != nil {
		return nil, nil, err
	}

	client, err := storage.NewClient(ctx, option.WithCredentials(creds))
	if err != nil {
		return nil, nil, err
	}

	bh := client.Bucket(bucket)
	// Next check if the bucket exists
	if _, err = bh.Attrs(ctx); err != nil {
		return nil, nil, err
	}

	obj := bh.Object(name)
	w := obj.NewWriter(ctx)
	if _, err := io.Copy(w, r); err != nil {
		return nil, nil, err
	}
	if err := w.Close(); err != nil {
		return nil, nil, err
	}

	if public {
		if err := obj.ACL().Set(ctx, storage.AllUsers, storage.RoleReader); err != nil {
			return nil, nil, err
		}
	}

	attrs, err := obj.Attrs(ctx)
	return obj, attrs, err
}
