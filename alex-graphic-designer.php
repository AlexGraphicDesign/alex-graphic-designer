<?php
namespace Grav\Theme;

use Grav\Common\Grav;
use Grav\Common\Theme;

class AlexGraphicDesigner extends Theme
{
    // Access plugin events in this class

    // Add images to twig template paths to allow inclusion of SVG files
    public function onTwigLoader()
    {
        $theme_paths = Grav::instance()['locator']->findResources('theme://images');
        foreach ($theme_paths as $images_path) {
            $this->grav['twig']->addPath($images_path, 'images');
        }
    }

}
