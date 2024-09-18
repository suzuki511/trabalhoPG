//==============================================================================================
// Modified by [Your Name] <your.email@example.com>
//
// This software is distributed under the CC0 Public Domain Dedication.
//==============================================================================================
#include <cmath>
#include "rtweekend.h"
#include "camera.h"
#include "hittable.h"
#include "hittable_list.h"
#include "material.h"
#include "sphere.h"
#ifndef M_PI
#define M_PI 3.14159265358979323846
#endif

// Function to create the world with different materials
void create_world(hittable_list &world, double time) {
    world.clear(); // Clear the world before adding new objects

    // Ground
    auto ground_material = make_shared<lambertian>(color(0.5, 0.5, 0.5));
    world.add(make_shared<sphere>(point3(0, -1000, 0), 1000, ground_material));

    // Sphere 1: Diffuse
    auto material1 = make_shared<lambertian>(color(0.8, 0.3, 0.3));  // Red diffuse
    world.add(make_shared<sphere>(point3(-2, 1, 0), 1.0, material1));

    // Sphere 2: Metal
    auto material2 = make_shared<metal>(color(0.8, 0.8, 0.8), 0.1); // Light gray metal
    world.add(make_shared<sphere>(point3(2, 1, 0), 1.0, material2));

    // Sphere 3: Glass (Moving sphere)
    auto material3 = make_shared<dielectric>(1.5); // Glass
    // Move the glass sphere along the z-axis based on time
    point3 moving_position(0, 1, 2 + 1.5 * sin(time));
    world.add(make_shared<sphere>(moving_position, 1.0, material3));

    // Sphere 4: Diffuse with different color
    auto material4 = make_shared<lambertian>(color(0.2, 0.8, 0.2)); // Green diffuse
    world.add(make_shared<sphere>(point3(-2, 1, -4), 1.0, material4));

    // Sphere 5: Metal with more fuzz
    auto material5 = make_shared<metal>(color(0.5, 0.2, 0.7), 0.3); // Purple metal
    world.add(make_shared<sphere>(point3(4, 1, -2), 1.0, material5));
}

int main() {
    hittable_list world;

    // Camera settings
    camera cam;
    cam.aspect_ratio = 16.0 / 9.0;
    cam.image_width = 800;
    cam.samples_per_pixel = 10;
    cam.max_depth = 20;

    cam.vfov = 20;
    cam.vup = vec3(0, 1, 0);
    cam.defocus_angle = 0.6;
    cam.focus_dist = 10.0;
    cam.lookfrom = point3(13,10,-10);//13 2 3
    cam.lookat   = point3(0,0,0);

    // Animation parameters
    int frames = 360; // Number of frames for the animation
    double radius = 13.0; // Radius of the camera orbit

    /*for (int frame = 0; frame < frames; ++frame) {
        double time = frame * 2 * M_PI / frames; // Current time for animation

        // Move the camera in a circular path
        cam.lookfrom = point3(radius * cos(time), 2, radius * sin(time));
        cam.lookat = point3(0, 0, 0);

        // Create the world with the moving sphere
        create_world(world, time);

        // Render the current frame
        cam.render(world); // Use the default render method without filename
    }*/
    create_world(world,300);//10
    cam.render(world);
    return 0;
}
