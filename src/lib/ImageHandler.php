<?php

namespace JackBradford\EasyCoffeeAtHome;
use JackBradford\Disphatch\Config\Config;

class ImageHandler {

    private $config;
    private $images = [];
    private $extensions = ['jpg', 'jpeg', 'png'];

    public function __construct(Config $config) {

        $this->config = $config;
    }

    /**
     * @method ImageHandler::import()
     * Import image files. Saves the image(s) to disk and creates new image
     * record(s) in the database.
     *
     * @param array $files
     * An array of image files.
     *
     * @param string $dir
     * The full name of the directory in which to save the images.
     *
     * @param int $userId
     * The ID of the user importing the photo.
     *
     * @return array
     * Returns an array of filepaths of the imported images. Throws an
     * Exception on failure.
     */
    public function import(array $files, $dir, $userId) {

        $i = 0;
        $ts = time();
        $images = [];
        foreach ($files as $label => $file) {

            $this->checkFileError($file);
            $this->checkFileType($file);
            $img = $this->resize($file['tmp_name']); 

            $filename = $userId . '_' . $ts . '_' . $i++;
            $path = $dir . $filename;

            if (imagejpeg($img, $path)) $images[] = [
                'path' => $path,
                'filename' => $filename,
            ];
            else throw new \Exception('Could not save image (' . $path . ').');
        }
        return $images;
    }

    /**
     * @method ImageHandler::resize()
     * Resize an image.
     *
     * @param string $path
     * The full filepath of a valid image file.
     *
     * @param int $maxSideLength
     * The maximum length of either side expressed in pixels.
     *
     * @return resource
     * Returns the image resource.
     */
    public function resize($path, $maxSideLength=800) {

        list($width, $height) = getimagesize($path);
        $img = imagecreatefromjpeg($path);
        if ($width > $maxSideLength) {

            $img = imagescale($img, $maxSideLength);
        }
        if ($height > $maxSideLength) {

            $aspectRatio = $width / $height;
            $newWidth = $maxSideLength * $aspectRatio;
            $img = imagescale($img, $newWidth);
        }
        return $img;
    }

    public function stage(array $files, $userId) {

        $dir = $this->config->getDirective('app_path') . 'htdocs/img/tmp/';
        return $this->import($files, $dir, $userId);
    }

    private function checkFileError($file) {

        if ($file['error'] !== 0) {

            throw new \Exception('The file could not be accepted.');
        }
    }

    private function checkFileType($file) {

        $pieces = explode('.', $file['name']);
        $ext = strtolower(end($pieces));
        if (!in_array($ext, $this->extensions)) {

            throw new \Exception('Files must be JPEG or PNG.');
        }
    }
}

